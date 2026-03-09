import { baseApi } from './baseApi'

export interface HotelIndexEntry {
  slug: string
  name: string
  primaryColor: string
  secondaryColor: string
  logoUrl: string
}

export interface HotelsIndexResponse {
  hotels: HotelIndexEntry[]
}

export interface Location {
  address: string
  latitude: number
  longitude: number
  city: string
  country: string
  mapUrl: string
}

export interface Ratings {
  google?: { score: number; reviewCount: number }
  overall: number
  stars: number
}

export interface ReviewComment {
  quote: string
  author: string
  source: string
  rating: number
}

export interface GalleryImage {
  url: string
  alt: string
  category: string
}

export interface Room {
  name: string
  description: string
  maxGuests: number
  sizeSqm: number
  highlights: string[]
  images: string[]
}

export interface Channel {
  name: string
  url: string
  label: string
  rating?: number
}

export interface SEO {
  title: string
  metaDescription: string
  keywords: string[]
}

export interface CameraKeyframe {
  scroll: number
  position: [number, number, number]
  lookAt: [number, number, number]
}

export interface Scene3D {
  style: string
  primaryImage: string
  cameraPath: CameraKeyframe[]
}

/** E.164 or display phone; used for tel: and WhatsApp. */
export type Phone = string

export interface Hotel {
  slug: string
  name: string
  tagline: string
  shortDescription: string
  /** Optional phone for Call and WhatsApp booking. */
  phone?: Phone
  location: Location
  ratings: Ratings
  topPositiveComments: ReviewComment[]
  highlights: string[]
  amenities: string[]
  gallery: GalleryImage[]
  rooms: Room[]
  channels: Channel[]
  seo: SEO
  '3dScene': Scene3D
  /** When set, hero shows this URL in an iframe instead of 3D/image. */
  customBannerUrl?: string
}

export const hotelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHotelsIndex: builder.query<HotelsIndexResponse, void>({
      query: () => 'hotels/index.json',
    }),
    getHotelBySlug: builder.query<Hotel, string>({
      query: (slug) => `hotels/${slug}.json`,
    }),
  }),
})

export const { useGetHotelsIndexQuery, useGetHotelBySlugQuery } = hotelApi
