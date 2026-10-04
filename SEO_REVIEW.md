# BPT SEO implementation review — October 4, 2026

## Implemented

- Server-rendered blog and news archives and full article pages with stable, readable URLs.
- Persistent public discussion URLs, server-rendered content and replies.
- Unique article titles, descriptions, canonical URLs and article-specific sharing metadata.
- BlogPosting / NewsArticle schema and DiscussionForumPosting schema derived from visible records, escaped safely.
- Dynamic sitemap includes only currently published articles and approved threads, with record update timestamps.
- RSS feed includes only publicly available publications.
- Account and editorial screens are noindex and excluded from the sitemap.
- Search-filtered article archives are noindex; paginated article archives have page-specific canonical URLs.
- Semantic headings, image alternative text, keyboard focus indicators, visible labels, mobile layout and skip navigation.
- Author attribution, category/tags, related articles, product/community links and linked sources supported.
- Removed fabricated forum counts/sample participation and unsupported founding-date structured data.
- Restored the three existing news items as full articles without inventing new announcements.

## Verified

Production compilation and TypeScript passed. HTTP smoke tests cover core pages, individual articles, sitemap inclusion, RSS, missing-article 404 behavior, rejected anonymous/invalid-token publishing, and retirement of the unsafe discussion-write API. Supabase rollback tests confirm scheduled/draft isolation and moderation protection. No BPT-table security advisories were returned.

## Remaining evidence and growth work

- Connect Google Search Console to inspect actual index coverage, sitemap processing, queries, impressions and clicks. No ranking/traffic improvements are claimed.
- Obtain field Core Web Vitals and run PageSpeed/Lighthouse on the production deployment. A passing build is not a performance score.
- Verify analytics and conversion events for product visits, trial/application clicks, member registrations and engagement. No fabricated analytics dashboard or scores were added.
- Confirm organization contact details and verified social profiles; maintain consistent business identity across sites.
- Review substantive article accuracy, source freshness, useful original examples and topic overlap over time. Publishing cadence alone does not guarantee rankings.
- Earn relevant citations and links through credible industry resources, useful research, case studies and professional partnerships.
- Evaluate additional sitemap partitions before 40,000 articles or 9,000 public threads; current limits keep one sitemap under Google's URL ceiling.

Reference documentation: https://developers.google.com/search/docs/fundamentals/seo-starter-guide and https://developers.google.com/search/docs/appearance/structured-data/discussion-forum .
