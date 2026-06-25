# Supabase CMS Integration Guide

This guide walks through setting up Supabase to power the news/blog system for Building Performance Technologies website.

## Overview

- **API Route**: `/app/api/news/route.ts` - Fetches articles from Supabase with fallback to demo data
- **News Page**: `/app/latest-news/page.tsx` - Client component that displays articles
- **Client Library**: `@supabase/supabase-js` - Supabase TypeScript/JavaScript SDK
- **Type Safety**: `lib/supabase.ts` - Supabase client and TypeScript interfaces

## Quick Start

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click **New Project**
3. Enter project details:
   - **Name**: `bpt-website` (or similar)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., `us-east-1`)
4. Click **Create new project** and wait 2-3 minutes for initialization

### 2. Get Your Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: Your `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** (public): Your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. (Optional) Copy the **Service Role Key** for server-side operations

### 3. Create the Database Table

In Supabase Dashboard, go to **SQL Editor** and run:

```sql
CREATE TABLE public.news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT,
  published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Create policy allowing public read access
CREATE POLICY "Allow public read access" ON public.news_articles
  FOR SELECT
  USING (published = TRUE);

-- Create index for better query performance
CREATE INDEX idx_news_published_date ON public.news_articles(published_at DESC) 
  WHERE published = TRUE;
```

### 4. Configure Environment Variables

Create `.env.local` in the project root (never commit this file):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

(Replace with your actual values from Supabase Settings → API)

### 5. Add Sample Data

In Supabase **Table Editor**, add articles:

| Field | Value |
|-------|-------|
| **title** | "BPMS™ Launches New Cloud Features" |
| **category** | "Product Update" |
| **excerpt** | "Introducing enhanced reporting and client management tools." |
| **content** | Full article content here... |
| **author** | "BPT Team" |
| **published** | ✓ (checked) |
| **published_at** | `now()` or pick a date |

### 6. Test the Integration

```bash
# Rebuild to pick up env variables
npm run build

# Start dev server
npm run dev

# Visit http://localhost:3000/latest-news
# Articles should load from Supabase
```

## File Structure

```
/app
  /api
    /news
      route.ts          ← API endpoint for fetching articles
  /latest-news
    page.tsx            ← News page component
/lib
  supabase.ts           ← Supabase client & types
.env.example            ← Template (commit this)
.env.local              ← Secrets (DO NOT COMMIT)
SUPABASE_SETUP.md       ← This file
```

## API Usage

### Fetch News (Frontend)

```typescript
const response = await fetch('/api/news?limit=10&offset=0');
const data = await response.json();
// Returns: { articles, source, total, note }
```

### Query Parameters

- `limit` (default: 10) - Number of articles to return
- `offset` (default: 0) - Pagination offset

## Managing Content

### Add Article via Supabase Dashboard

1. Go to **Table Editor** → **news_articles**
2. Click **Insert row**
3. Fill in fields:
   - `title`: Article headline
   - `category`: "Company Update", "Product News", etc.
   - `excerpt`: Short summary (shows in list)
   - `content`: Full article text
   - `author`: Author name
   - `published`: Toggle to true when ready
4. Click **Save**

### Publish/Unpublish

Toggle the `published` field to show/hide articles without deleting them.

### Edit Article

Click any row in the table editor to modify existing articles. Changes appear on the website immediately.

## Fallback Behavior

If Supabase environment variables are not configured, the API returns **demo data**. This allows the website to work without external dependencies while you're developing.

Once you add env variables, it automatically switches to fetching from Supabase.

## Advanced: Server-Side Rendering

To fetch news server-side (faster page loads), update the news page:

```typescript
import { supabase } from "@/lib/supabase";

export async function generateStaticParams() {
  // Pre-build the page with articles
  return [];
}

export default async function LatestNewsPage() {
  const { data: articles } = await supabase
    .from('news_articles')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });
    
  // ... render articles
}
```

## Troubleshooting

### Articles not loading?

1. Check browser console for errors
2. Verify env variables in `.env.local`
3. Ensure `published` column is `TRUE` for articles
4. Check Supabase **Authentication** → **Policies** for RLS rules

### Getting 403/404 errors?

Your RLS policy may be blocking access. In Supabase **SQL Editor**:

```sql
-- Check if policy exists
SELECT * FROM pg_policies 
WHERE schemaname='public' AND tablename='news_articles';
```

If missing, run the policy creation SQL from step 3 above.

### Articles appear then disappear?

Check the `published_at` field. The API filters by `published = true` only.

## Deployment to Vercel

1. Go to **Vercel Project Settings** → **Environment Variables**
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
3. Redeploy: `git push origin main`

## Security Notes

- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Safe to expose (public)
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Safe to expose (limited permissions)
- ❌ `SUPABASE_SERVICE_KEY` - NEVER expose in frontend or .env.example
- Use RLS policies to restrict write access to authenticated users only

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Create `news_articles` table
3. ✅ Add environment variables
4. ✅ Add sample articles via dashboard
5. ✅ Test at `/latest-news`
6. ✅ Deploy to Vercel with env vars
7. 🎯 Optionally create admin panel for content management

## Additional CMS Options

This setup is flexible. You can also connect:

- **Markdown files** in `/public/news/` directory
- **Contentful** headless CMS
- **Notion** database (via API)
- **Strapi** self-hosted CMS
- **WordPress** REST API
- **Ghost** blog platform

Just update `/app/api/news/route.ts` to fetch from your chosen source.

---

**Questions?** Check [Supabase docs](https://supabase.com/docs) or create an issue.
