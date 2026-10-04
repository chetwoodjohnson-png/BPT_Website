"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { manage, browserDB } from "@/lib/browser";
import { postPath, type Post, type Thread, type Reply } from "@/lib/platform";
import ArticleBody from "./ArticleBody";
type Editor = Omit<
  Post,
  "tags" | "published_at" | "created_at" | "updated_at"
> & { tags: string; published_at: string };
const blank = (): Editor => ({
  id: "",
  kind: "blog",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Building Performance",
  tags: "",
  author: "BPT Editorial Team",
  author_bio: "",
  image_url: null,
  image_alt: "",
  seo_title: "",
  seo_description: "",
  status: "draft",
  published_at: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16),
});
export default function PublishingDesk() {
  const [role, setRole] = useState(""),
    [posts, setPosts] = useState<Post[]>([]),
    [threads, setThreads] = useState<Thread[]>([]),
    [replies, setReplies] = useState<Reply[]>([]),
    [reports, setReports] = useState<
      { id: string; thread_id: string; reason: string }[]
    >([]),
    [form, setForm] = useState<Editor>(blank),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false),
    [preview, setPreview] = useState(false),
    [filter, setFilter] = useState("");
  async function load() {
    const d = await manage("dashboard");
    setRole(d.role);
    if (["admin", "editor"].includes(d.role))
      setPosts((await manage("post.list")).data);
    if (["admin", "moderator"].includes(d.role)) {
      const q = await manage("moderation.list");
      setThreads(q.threads);
      setReplies(q.replies);
      setReports(q.reports);
    }
  }
  useEffect(() => {
    load().catch((e) => setMessage(e.message));
  }, []);
  function open(p: Post) {
    setForm({
      ...p,
      tags: p.tags.join(", "),
      published_at: new Date(
        new Date(p.published_at).getTime() -
          new Date(p.published_at).getTimezoneOffset() * 60000,
      )
        .toISOString()
        .slice(0, 16),
    });
    setPreview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const r = await manage("post.save", {
        ...form,
        published_at: new Date(form.published_at).toISOString(),
      });
      open(r.data);
      await load();
      setMessage(
        form.status === "published"
          ? new Date(form.published_at) > new Date()
            ? "Article scheduled. It will become public at the selected time."
            : "Article published."
          : "Article saved.",
      );
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function upload(file?: File) {
    if (!file) return;
    setBusy(true);
    try {
      if (
        !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size > 5242880
      )
        throw new Error("Use a JPEG, PNG, or WebP image up to 5 MB.");
      const db = browserDB(),
        path = `${crypto.randomUUID()}.${file.type.split("/")[1]}`;
      const { error } = await db.storage
        .from("bpt-editorial")
        .upload(path, file, { contentType: file.type });
      if (error) throw error;
      setForm((f) => ({
        ...f,
        image_url: db.storage.from("bpt-editorial").getPublicUrl(path).data
          .publicUrl,
      }));
      setMessage(
        "Image uploaded. Add descriptive alternative text before saving.",
      );
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function moderate(
    type: string,
    item: Thread | Reply | { id: string },
    changes: Record<string, unknown>,
  ) {
    setBusy(true);
    try {
      await manage("moderation.update", { ...item, ...changes, type });
      await load();
      setMessage("Moderation changes saved.");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const input = (
    key: keyof Editor,
    label: string,
    max: number,
    required = false,
  ) => (
    <label>
      {label}
      <input
        value={String(form[key] || "")}
        maxLength={max}
        required={required}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
    </label>
  );
  return (
    <div className="editorial">
      <p className="feedback" role="status">
        {message}
      </p>
      {!role && (
        <p>
          <Link className="textLink" href="/account">
            Sign in with your editorial account
          </Link>{" "}
          to manage publishing.
        </p>
      )}
      {role === "member" && (
        <p>Your account does not have publishing or moderation access.</p>
      )}
      {["admin", "editor"].includes(role) && (
        <>
          <div className="toolbar">
            <h2 className="cardTitle">
              {form.id ? "Edit article" : "Create an article"}
            </h2>
            <button
              className="buttonSecondary"
              onClick={() => {
                setForm(blank());
                setPreview(false);
              }}
            >
              New article
            </button>
          </div>
          <form onSubmit={save} className="editorForm card">
            <div className="grid2">
              <label>
                Publication
                <select
                  value={form.kind}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      kind: e.target.value as "blog" | "news",
                    })
                  }
                >
                  <option value="blog">Blog</option>
                  <option value="news">News</option>
                </select>
              </label>
              <label>
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published / scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
            </div>
            {input("title", "Headline", 180, true)}
            <label>
              URL slug
              <input
                value={form.slug}
                pattern="[a-z0-9]+(-[a-z0-9]+)*"
                required
                maxLength={160}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    slug: form.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-|-$/g, "")
                      .slice(0, 160),
                  })
                }
              >
                Generate from headline
              </button>
            </label>
            <label>
              Summary
              <textarea
                value={form.excerpt}
                maxLength={500}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              />
            </label>
            <label>
              Article content
              <textarea
                rows={18}
                value={form.content}
                maxLength={100000}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              <small>
                Use blank lines for paragraphs, ## for headings, ### for
                subheadings, and - for bullet lists. Include source names and
                URLs in the article.
              </small>
            </label>
            <button
              type="button"
              className="buttonSecondary"
              onClick={() => setPreview(!preview)}
            >
              {preview ? "Close preview" : "Preview article"}
            </button>
            {preview && (
              <article className="previewPanel">
                <h2>{form.title}</h2>
                <p>{form.excerpt}</p>
                <ArticleBody text={form.content} />
              </article>
            )}
            <div className="grid2">
              {input("category", "Category", 80, true)}
              {input("tags", "Tags, separated by commas", 500)}
              {input("author", "Author / byline", 80, true)}
              <label>
                Publish date & time (your local time)
                <input
                  type="datetime-local"
                  value={form.published_at}
                  required
                  onChange={(e) =>
                    setForm({ ...form, published_at: e.target.value })
                  }
                />
              </label>
            </div>
            {input("author_bio", "Author biography", 2000)}
            <label>
              Upload cover image (JPEG, PNG, WebP; up to 5 MB)
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => upload(e.target.files?.[0])}
                disabled={busy}
              />
            </label>
            {input("image_url", "Cover image HTTPS URL", 2000)}
            {input(
              "image_alt",
              "Cover image description",
              300,
              !!form.image_url,
            )}
            <details open>
              <summary>Search appearance</summary>
              {input(
                "seo_title",
                `SEO title (${(form.seo_title || form.title).length} characters)`,
                180,
              )}
              {input(
                "seo_description",
                `SEO description (${(form.seo_description || form.excerpt).length} characters)`,
                320,
              )}
              <p>
                Write a clear, unique title and useful summary. Preview the
                article before publishing; published URLs should remain
                permanent.
              </p>
            </details>
            <div className="actions">
              <button className="button" disabled={busy}>
                {busy ? "Saving…" : "Save article"}
              </button>
              {form.id &&
                form.status === "published" &&
                new Date(form.published_at) <= new Date() && (
                  <Link className="buttonSecondary" href={postPath(form)}>
                    View public article
                  </Link>
                )}
            </div>
          </form>
          <h2>Article library</h2>
          <label>
            Filter articles
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Title, type, or status"
            />
          </label>
          <div className="threadList">
            {posts
              .filter((p) =>
                `${p.title} ${p.kind} ${p.status}`
                  .toLowerCase()
                  .includes(filter.toLowerCase()),
              )
              .map((p) => (
                <article className="card" key={p.id}>
                  <p className="newsMeta">
                    {p.kind} ·{" "}
                    {p.status === "published" &&
                    new Date(p.published_at) > new Date()
                      ? "scheduled"
                      : p.status}
                  </p>
                  <h3>{p.title}</h3>
                  <button className="buttonSecondary" onClick={() => open(p)}>
                    Edit article
                  </button>
                </article>
              ))}
          </div>
        </>
      )}
      {["admin", "moderator"].includes(role) && (
        <>
          <h2>Community moderation</h2>
          <p>
            Review pending submissions, remove abuse, pin useful topics, and
            close discussions. Display names are member-selected.
          </p>
          {[
            ...threads.map((x) => ({ ...x, type: "thread" })),
            ...replies.map((x) => ({ ...x, type: "reply" })),
          ]
            .sort(
              (a, b) =>
                (a.status === "pending" ? -1 : 1) -
                (b.status === "pending" ? -1 : 1),
            )
            .map((item) => (
              <article className="card" key={item.id}>
                <p className="newsMeta">
                  {item.type} · {item.status} · {item.author}
                </p>
                {"title" in item && <h3>{String(item.title)}</h3>}
                <p className="userContent">{item.content}</p>
                <div className="actions">
                  <button
                    disabled={busy}
                    onClick={() =>
                      moderate(item.type, item, { status: "published" })
                    }
                  >
                    Approve
                  </button>
                  <button
                    disabled={busy}
                    onClick={() =>
                      moderate(item.type, item, { status: "hidden" })
                    }
                  >
                    Hide
                  </button>
                  {"pinned" in item && (
                    <>
                      <button
                        disabled={busy}
                        onClick={() =>
                          moderate(item.type, item, { pinned: !item.pinned })
                        }
                      >
                        {item.pinned ? "Unpin" : "Pin"}
                      </button>
                      <button
                        disabled={busy}
                        onClick={() =>
                          moderate(item.type, item, { locked: !item.locked })
                        }
                      >
                        {item.locked ? "Unlock" : "Lock"}
                      </button>
                    </>
                  )}
                </div>
              </article>
            ))}
          <h2>Abuse reports</h2>
          {!reports.length && <p>No unresolved reports.</p>}
          {reports.map((r) => (
            <article className="card" key={r.id}>
              <p>{r.reason}</p>
              <div className="actions">
                <Link href={`/forum/${r.thread_id}`}>Open discussion</Link>
                <button
                  disabled={busy}
                  onClick={() => moderate("report", r, {})}
                >
                  Mark reviewed
                </button>
              </div>
            </article>
          ))}
        </>
      )}
      <p className="feedback" role="status">
        {message}
      </p>
    </div>
  );
}
