import { NextResponse } from 'next/server'
import type { NewsArticle } from '@/lib/supabase'

/**
 * GET /api/news
 * Fetches all published news articles from Supabase or fallback data
 * Supports query parameters:
 *   - limit: number of articles to return (default: 10)
 *   - offset: pagination offset (default: 0)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    // Check if Supabase is configured
    const hasSupabaseConfig =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (hasSupabaseConfig) {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { data, error } = await supabase
          .from('news_articles')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .range(offset, offset + limit - 1)

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        return NextResponse.json({
          articles: data || [],
          source: 'supabase',
          total: data?.length || 0,
        })
      } catch (supabaseError) {
        console.warn('Failed to fetch from Supabase, using fallback:', supabaseError)
        // Fall through to fallback data below
      }
    }

    // Fallback data (hardcoded for when Supabase is not configured)
    const fallbackArticles: NewsArticle[] = [
      {
        id: '1',
        title: 'Building Performance Technologies expands the BPMS™ ecosystem',
        category: 'Company Update',
        excerpt: 'The company is developing a connected system that brings together cloud software, mobile field capture, thermal documentation, LiDAR scanning, and building performance analysis.',
        content: 'The company is developing a connected system that brings together cloud software, mobile field capture, thermal documentation, LiDAR scanning, and building performance analysis. This comprehensive ecosystem enables building professionals to conduct thorough energy audits and performance assessments.',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'BPMSField™ supports mobile-first building documentation',
        category: 'Product News',
        excerpt: 'BPMSField™ is positioned as the mobile field companion for collecting photos, thermal images, LiDAR scans, and audit evidence directly from the jobsite.',
        content: 'BPMSField™ is positioned as the mobile field companion for collecting photos, thermal images, LiDAR scans, and audit evidence directly from the jobsite. The mobile app integrates seamlessly with the BPMS™ cloud platform for unified workflows.',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'BPMS FluxSense Analyzer™ concept targets direct heat flux measurement',
        category: 'Innovation',
        excerpt: 'The analyzer concept is designed to strengthen building diagnostics by measuring thermal transfer and supporting cloud-based performance modeling.',
        content: 'The analyzer concept is designed to strengthen building diagnostics by measuring thermal transfer and supporting cloud-based performance modeling. This hardware innovation will enhance the diagnostic capabilities of the BPMS ecosystem.',
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]

    return NextResponse.json({
      articles: fallbackArticles.slice(offset, offset + limit),
      source: 'fallback',
      total: fallbackArticles.length,
      note: 'Using fallback data. Configure Supabase environment variables for dynamic content.',
    })
  } catch (error) {
    console.error('News API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news articles' },
      { status: 500 }
    )
  }
}
