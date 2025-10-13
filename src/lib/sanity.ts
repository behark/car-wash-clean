import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuration for Sanity client with aggressive memory optimizations
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  requestTagPrefix: 'cw',
  ignoreBrowserTokenWarning: true,
  stega: {
    enabled: false,
  },
  // Aggressive memory optimization settings
  withCredentials: false,
  maxRetries: 1,
  timeout: 5000,
  allowReconfigure: false,
})

// Helper for generating image URLs
const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

// Service type definition
export interface Service {
  _id: string
  titleFi: string
  titleEn?: string
  descriptionFi: string
  descriptionEn?: string
  price: number
  duration: number
  capacity: number
  image?: any
  isActive: boolean
  category: 'wash' | 'tire' | 'additional' | 'premium'
}

// Testimonial type definition
export interface Testimonial {
  _id: string
  name: string
  contentFi: string
  contentEn?: string
  rating: number
  approved: boolean
  createdAt: string
}

// Sanity queries
export const serviceQuery = `
  *[_type == "service" && isActive == true] | order(category, price) {
    _id,
    titleFi,
    titleEn,
    descriptionFi,
    descriptionEn,
    price,
    duration,
    capacity,
    image,
    isActive,
    category
  }
`

export const testimonialQuery = `
  *[_type == "testimonial" && approved == true] | order(_createdAt desc) {
    _id,
    name,
    contentFi,
    contentEn,
    rating,
    approved,
    _createdAt
  }
`

// Ultra-aggressive memory-optimized caching with automatic cleanup
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes - longer cache to reduce fetches
const MAX_CACHE_SIZE = 50; // Maximum items in cache
let servicesCache: { data: Service[]; timestamp: number } | null = null;
let testimonialsCache: { data: Testimonial[]; timestamp: number } | null = null;

// Automatic cleanup timer
let cleanupTimer: NodeJS.Timeout | null = null;

// Set up automatic cache cleanup
if (typeof window === 'undefined') {
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    if (servicesCache && now - servicesCache.timestamp > CACHE_TTL) {
      servicesCache = null;
    }
    if (testimonialsCache && now - testimonialsCache.timestamp > CACHE_TTL) {
      testimonialsCache = null;
    }
  }, CACHE_TTL);
}

export async function getServices(): Promise<Service[]> {
  try {
    // Check cache first
    if (servicesCache && Date.now() - servicesCache.timestamp < CACHE_TTL) {
      return servicesCache.data;
    }

    const data = await client.fetch(serviceQuery, {}, {
      cache: 'force-cache',
      next: { revalidate: 600 } // 10 minutes
    });

    // Limit data size and optimize memory
    const optimizedData = data.slice(0, MAX_CACHE_SIZE).map((service: any) => ({
      _id: service._id,
      titleFi: service.titleFi,
      titleEn: service.titleEn || service.titleFi,
      descriptionFi: service.descriptionFi,
      descriptionEn: service.descriptionEn || service.descriptionFi,
      price: service.price,
      duration: service.duration,
      capacity: service.capacity,
      image: service.image,
      isActive: service.isActive,
      category: service.category
    }));

    // Update cache
    servicesCache = { data: optimizedData, timestamp: Date.now() };

    // Force garbage collection if available
    if (typeof global !== 'undefined' && global.gc) {
      global.gc();
    }

    return optimizedData;
  } catch (error) {
    console.error('Error fetching services:', error);
    // Return cached data if available, otherwise empty array
    return servicesCache?.data || [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    // Check cache first
    if (testimonialsCache && Date.now() - testimonialsCache.timestamp < CACHE_TTL) {
      return testimonialsCache.data;
    }

    const data = await client.fetch(testimonialQuery, {}, {
      cache: 'force-cache',
      next: { revalidate: 600 } // 10 minutes
    });

    // Limit and optimize testimonials data
    const optimizedData = data.slice(0, 10).map((testimonial: any) => ({
      _id: testimonial._id,
      name: testimonial.name,
      contentFi: testimonial.contentFi,
      contentEn: testimonial.contentEn || testimonial.contentFi,
      rating: testimonial.rating,
      approved: testimonial.approved,
      createdAt: testimonial._createdAt
    }));

    // Update cache
    testimonialsCache = { data: optimizedData, timestamp: Date.now() };

    // Force garbage collection if available
    if (typeof global !== 'undefined' && global.gc) {
      global.gc();
    }

    return optimizedData;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    // Return cached data if available, otherwise empty array
    return testimonialsCache?.data || [];
  }
}

// Enhanced cleanup function for aggressive memory management
export function cleanupSanityCache() {
  servicesCache = null;
  testimonialsCache = null;

  // Clear cleanup timer
  if (cleanupTimer) {
    clearInterval(cleanupTimer);
    cleanupTimer = null;
  }

  // Force garbage collection if available
  if (typeof global !== 'undefined' && global.gc) {
    global.gc();
  }
}

// Emergency memory cleanup - call when memory pressure detected
export function emergencyMemoryCleanup() {
  cleanupSanityCache();

  // Additional cleanup for emergency situations
  if (typeof window !== 'undefined') {
    // Clear any timers or intervals
    for (let i = 1; i < 99999; i++) {
      window.clearTimeout(i);
      window.clearInterval(i);
    }
  }
}

// Process cleanup handler
if (typeof process !== 'undefined') {
  process.on('beforeExit', cleanupSanityCache);
  process.on('SIGTERM', cleanupSanityCache);
  process.on('SIGINT', cleanupSanityCache);
}