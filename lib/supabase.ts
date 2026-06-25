import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

/**
 * Supabase client for browser/client-side operations
 * Uses anonymous key for public read access
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Article/News interface for type safety
 */
export interface NewsArticle {
  id: string
  title: string
  category: string
  excerpt: string
  content: string
  published_at: string
  created_at: string
  updated_at: string
  image_url?: string
  author?: string
}
