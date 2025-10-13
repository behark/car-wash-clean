import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuration for Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
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
  category: 'wash' | 'tire' | 'additional'
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

// Fetch functions
export async function getServices(): Promise<Service[]> {
  try {
    return await client.fetch(serviceQuery)
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await client.fetch(testimonialQuery)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}