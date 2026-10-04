# BPT publishing and community

This site uses dedicated `bpt_*` tables in Supabase. Apply the checked-in migration to a configured Supabase project before deploying. The application uses only the public/publishable API key; it does not need a service-role key.

Environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (accepts the recommended publishable key)
- `NEXT_PUBLIC_ORG_SAMEAS` (optional verified organization profile URLs)

## Editorial access

Sign in at `/account`, then open `/admin`. An explicitly authorized database administrator must add the approved existing Auth user to `bpt_staff` with role `editor`, `moderator`, or `admin`. No account receives staff access automatically. Users cannot edit their own staff roles.

The initial staff assignment is pending explicit owner confirmation. Do not grant roles based on user-editable metadata or inferred email addresses.

## Authentication configuration

Preserve the existing project Auth site URL. Add the production BPT callback `https://www.buildingperformancetechnologies.com/account` to Supabase Auth's redirect allow-list. Verify confirmation and recovery emails return to BPT, and configure production SMTP, CAPTCHA and Auth rate limits as appropriate. These settings were not accessible through the available connector and email delivery has not been tested. Existing confirmed accounts can use password sign-in.

## Publishing

Create blog or news articles with a permanent unique slug, byline, summary, body, category, tags, optional cover and alt text, and search title/description. Use plain Markdown paragraphs, `##`/`###` headings, bullet lists, and HTTPS or site-relative Markdown links. Raw HTML is escaped.

Draft and archived posts are private. `published` records with a future publication timestamp remain private until the timestamp passes; public rendering, RSS, sitemap and detail pages enforce the same cutoff. No cron is required for scheduled visibility. Keep published slugs stable. Archive to withdraw content.

Images support JPEG, PNG and WebP up to 5 MB through the `bpt-editorial` storage bucket. Only editorial staff can upload. Avoid placing private documents in this public image bucket.

## Community

Verified email sign-in is required for application writes. Threads/replies are persistent and begin pending. Moderators approve, hide, pin and lock. Members can edit/delete their own contributions, save discussions and report abuse. Edits require renewed review. Posting is capped at 20 submissions per member per hour at the database layer; first-party forms show database failures rather than pretending to save. Existing in-memory sample conversations were not real records and were removed.

Moderation and member activity views currently show up to 200 and 100 records respectively; article administration shows up to 500. Public article/thread/reply listings paginate. Extend administrative pagination before these limits are reached.

## Automated articles

Separate ChatGPT scheduled tasks publish blog articles Monday/Wednesday/Friday mornings and an energy-industry roundup Tuesday mornings in America/New_York. They research sources, check recent posts, write to `bpt_posts`, and verify the public detail URL. Publishing depends on the connected account remaining available. Existing BPMS draft-only automations were preserved.

## Verification

`npm run build` checks production compilation and TypeScript. Run `node tests/smoke.mjs` against a running server; set `TEST_BASE_URL` for deployment checks. Database rollback tests checked that anonymous readers cannot see drafts/future publications and ordinary members cannot self-publish a forum thread. Full staff UI mutation testing awaits approved staff provisioning. Do not claim email delivery, Search Console indexing, or field Core Web Vitals have been verified without evidence.
