import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuration for Sanity client with memory optimizations
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  requestTagPrefix: 'car-wash',
  ignoreBrowserTokenWarning: true,
  stega: {
    enabled: false,
  },
  // Memory optimization settings
  withCredentials: false,
  maxRetries: 2,
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

// Memory-optimized fetch functions with caching
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let servicesCache: { data: Service[]; timestamp: number } | null = null;
let testimonialsCache: { data: Testimonial[]; timestamp: number } | null = null;

export async function getServices(): Promise<Service[]> {
  try {
    // Check cache first
    if (servicesCache && Date.now() - servicesCache.timestamp < CACHE_TTL) {
      return servicesCache.data;
    }

    const data = await client.fetch(serviceQuery, {}, {
      cache: 'force-cache',
      next: { revalidate: 300 } // 5 minutes
    });

    // Update cache
    servicesCache = { data, timestamp: Date.now() };
    return data;
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
      next: { revalidate: 300 } // 5 minutes
    });

    // Update cache
    testimonialsCache = { data, timestamp: Date.now() };
    return data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    // Return cached data if available, otherwise empty array
    return testimonialsCache?.data || [];
  }
}

// Cleanup function for memory management
export function cleanupSanityCache() {
  servicesCache = null;
  testimonialsCache = null;
}