import { NextResponse } from "next/server";
import { database, CATEGORIES } from "@/lib/platform";
export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization")?.replace(/^Bearer /, "");
    if (!token)
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    const db = database(token),
      {
        data: { user },
        error: authError,
      } = await db.auth.getUser(token);
    if (authError || !user || user.is_anonymous || !user.email_confirmed_at)
      return NextResponse.json(
        { error: "Sign in with a verified email address." },
        { status: 401 },
      );
    if (Number(request.headers.get("content-length") || 0) > 150000)
      return NextResponse.json(
        { error: "Request too large." },
        { status: 413 },
      );
    const raw = await request.text();
    if (raw.length > 150000)
      return NextResponse.json(
        { error: "Request too large." },
        { status: 413 },
      );
    const { action, payload: p = {} } = JSON.parse(raw);
    const { data: staff } = await db
      .from("bpt_staff")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();
    const editorial = staff && ["admin", "editor"].includes(staff.role),
      moderator = staff && ["admin", "moderator"].includes(staff.role);
    const field = (name: string, min: number, max: number) => {
      const value = p[name];
      if (
        typeof value !== "string" ||
        value.trim().length < min ||
        value.length > max
      )
        throw new Error(
          `Please check ${name.replace(/_/g, " ")} (${min}–${max} characters).`,
        );
      return value.trim();
    };
    const id = () => {
      if (typeof p.id !== "string" || !/^[0-9a-f-]{36}$/i.test(p.id))
        throw new Error("Invalid record.");
      return p.id;
    };
    const finish = (r: {
      data: unknown;
      error: { message: string } | null;
    }) => {
      if (r.error) throw new Error(r.error.message);
      return NextResponse.json({ data: r.data });
    };
    if (action === "dashboard") {
      const [threads, replies, bookmarks] = await Promise.all([
        db
          .from("bpt_threads")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(100),
        db
          .from("bpt_replies")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(100),
        db
          .from("bpt_bookmarks")
          .select("thread_id,bpt_threads(id,title)")
          .eq("user_id", user.id),
      ]);
      if (threads.error || replies.error || bookmarks.error)
        throw new Error("Unable to load your activity.");
      return NextResponse.json({
        role: staff?.role || "member",
        userId: user.id,
        threads: threads.data,
        replies: replies.data,
        bookmarks: bookmarks.data,
      });
    }
    if (action === "thread.create") {
      const category = field("category", 2, 80);
      if (!CATEGORIES.includes(category)) throw new Error("Choose a category.");
      return finish(
        await db
          .from("bpt_threads")
          .insert({
            title: field("title", 3, 180),
            content: field("content", 10, 15000),
            author: field("author", 2, 80),
            category,
          })
          .select()
          .single(),
      );
    }
    if (action === "reply.create")
      return finish(
        await db
          .from("bpt_replies")
          .insert({
            thread_id: id(),
            content: field("content", 2, 10000),
            author: field("author", 2, 80),
          })
          .select()
          .single(),
      );
    if (action === "bookmark.toggle") {
      const thread_id = id(),
        { data, error } = await db
          .from("bpt_bookmarks")
          .select("thread_id")
          .eq("thread_id", thread_id)
          .eq("user_id", user.id)
          .maybeSingle();
      if (error) throw error;
      return finish(
        data
          ? await db
              .from("bpt_bookmarks")
              .delete()
              .eq("thread_id", thread_id)
              .eq("user_id", user.id)
          : await db.from("bpt_bookmarks").insert({ thread_id }),
      );
    }
    if (action === "report")
      return finish(
        await db
          .from("bpt_reports")
          .insert({ thread_id: id(), reason: field("reason", 5, 1000) })
          .select()
          .single(),
      );
    if (action === "own.delete" || action === "own.edit") {
      if (!["thread", "reply"].includes(p.type))
        throw new Error("Invalid content type.");
      const table = p.type === "thread" ? "bpt_threads" : "bpt_replies";
      return finish(
        action === "own.delete"
          ? await db
              .from(table)
              .delete()
              .eq("id", id())
              .eq("user_id", user.id)
              .select()
              .single()
          : await db
              .from(table)
              .update({
                content: field("content", p.type === "thread" ? 10 : 2, 10000),
              })
              .eq("id", id())
              .eq("user_id", user.id)
              .select()
              .single(),
      );
    }
    if (action.startsWith("post.") && !editorial)
      return NextResponse.json(
        { error: "Editorial access required." },
        { status: 403 },
      );
    if (action === "post.list")
      return finish(
        await db
          .from("bpt_posts")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(500),
      );
    if (action === "post.save") {
      const kind = field("kind", 4, 4),
        status = field("status", 5, 9),
        slug = field("slug", 1, 160);
      if (
        !["blog", "news"].includes(kind) ||
        !["draft", "published", "archived"].includes(status) ||
        !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)
      )
        throw new Error("Check article type, status, and URL slug.");
      const published_at = new Date(p.published_at);
      if (!Number.isFinite(published_at.getTime()))
        throw new Error("Choose a valid publication date.");
      const image_url = p.image_url ? field("image_url", 8, 2000) : null;
      if (image_url && !image_url.startsWith("https://"))
        throw new Error("Use an HTTPS image URL.");
      const record = {
        kind,
        status,
        slug,
        title: field("title", 3, 180),
        excerpt: field("excerpt", status === "published" ? 20 : 0, 500),
        content: field("content", status === "published" ? 50 : 0, 100000),
        author: field("author", 2, 80),
        author_bio: field("author_bio", 0, 2000),
        category: field("category", 2, 80),
        seo_title: field("seo_title", 0, 180),
        seo_description: field("seo_description", 0, 320),
        image_url,
        image_alt: field("image_alt", image_url ? 3 : 0, 300),
        tags: field("tags", 0, 500)
          .split(",")
          .map((x: string) => x.trim())
          .filter(Boolean)
          .slice(0, 20),
        published_at: published_at.toISOString(),
      };
      if (p.id) {
        const { data: old } = await db
          .from("bpt_posts")
          .select("slug,kind,status")
          .eq("id", id())
          .single();
        if (
          old?.status === "published" &&
          (old.slug !== slug || old.kind !== kind)
        )
          throw new Error(
            "Published URLs are permanent. Keep the original type and slug.",
          );
      }
      return finish(
        p.id
          ? await db
              .from("bpt_posts")
              .update(record)
              .eq("id", id())
              .select()
              .single()
          : await db.from("bpt_posts").insert(record).select().single(),
      );
    }
    if (action.startsWith("moderation.") && !moderator)
      return NextResponse.json(
        { error: "Moderator access required." },
        { status: 403 },
      );
    if (action === "moderation.list") {
      const [threads, replies, reports] = await Promise.all([
        db
          .from("bpt_threads")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200),
        db
          .from("bpt_replies")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200),
        db.from("bpt_reports").select("*").eq("resolved", false).limit(200),
      ]);
      if (threads.error || replies.error || reports.error)
        throw new Error("Unable to load moderation queue.");
      return NextResponse.json({
        threads: threads.data,
        replies: replies.data,
        reports: reports.data,
      });
    }
    if (action === "moderation.update") {
      if (!["thread", "reply", "report"].includes(p.type))
        throw new Error("Invalid content type.");
      if (p.type === "report")
        return finish(
          await db
            .from("bpt_reports")
            .update({ resolved: true })
            .eq("id", id())
            .select()
            .single(),
        );
      if (!["pending", "published", "hidden"].includes(p.status))
        throw new Error("Invalid moderation status.");
      return finish(
        await db
          .from(p.type === "thread" ? "bpt_threads" : "bpt_replies")
          .update({
            status: p.status,
            ...(p.type === "thread"
              ? { pinned: !!p.pinned, locked: !!p.locked }
              : {}),
          })
          .eq("id", id())
          .select()
          .single(),
      );
    }
    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to complete request.",
      },
      { status: 400 },
    );
  }
}
