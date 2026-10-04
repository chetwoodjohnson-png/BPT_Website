import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3001";
for (const path of [
  "/",
  "/blog",
  "/latest-news",
  "/forum",
  "/account",
  "/admin",
  "/sitemap.xml",
  "/feed.xml",
  "/robots.txt",
]) {
  const r = await fetch(base + path);
  assert.equal(r.status, 200, path);
  const body = await r.text();
  assert(!body.includes("supabaseUrl is required"), path);
  console.log("PASS", path);
}
const r = await fetch(base + "/api/news");
const news = await r.json();
assert(news.articles.length >= 3);
const article = news.articles[0];
const path = "/latest-news/" + article.slug;
const html = await (await fetch(base + path)).text();
assert(html.includes(article.title));
assert(html.includes("NewsArticle"));
assert(html.includes('rel="canonical"'));
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
assert(sitemap.includes(path));
assert(!sitemap.includes("/admin"));
assert(!sitemap.includes("/account"));
assert.equal((await fetch(base + "/latest-news/no-such-article")).status, 404);
assert.equal(
  (
    await fetch(base + "/api/manage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "post.save" }),
    })
  ).status,
  401,
);
assert.equal(
  (await fetch(base + "/api/discussions", { method: "POST" })).status,
  410,
);
assert.equal(
  (
    await fetch(base + "/api/manage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer invalid",
      },
      body: JSON.stringify({ action: "post.save" }),
    })
  ).status,
  401,
);
console.log(
  "PASS article detail, sitemap inclusion, missing page, write protection, retired unsafe API",
);
