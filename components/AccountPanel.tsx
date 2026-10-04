"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { browserDB, manage } from "@/lib/browser";
import type { Thread, Reply } from "@/lib/platform";
type Dashboard = {
  role: string;
  threads: Thread[];
  replies: Reply[];
  bookmarks: {
    thread_id: string;
    bpt_threads: { id: string; title: string } | null;
  }[];
};
export default function AccountPanel() {
  const [signed, setSigned] = useState(false),
    [mode, setMode] = useState("signin"),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false),
    [dashboard, setDashboard] = useState<Dashboard | null>(null);
  async function load() {
    const { data } = await browserDB().auth.getSession();
    setSigned(!!data.session);
    if (data.session) setDashboard(await manage("dashboard"));
    else setDashboard(null);
  }
  useEffect(() => {
    load().catch((e) => setMessage(e.message));
    let subscription: { unsubscribe: () => void } | undefined;
    try {
      subscription = browserDB().auth.onAuthStateChange(() => {
        setTimeout(() => load().catch((e) => setMessage(e.message)), 0);
      }).data.subscription;
    } catch {}
    return () => subscription?.unsubscribe();
  }, []);
  async function auth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const f = new FormData(e.currentTarget),
      email = String(f.get("email")),
      password = String(f.get("password") || "");
    try {
      const db = browserDB();
      const result =
        mode === "signup"
          ? await db.auth.signUp({
              email,
              password,
              options: { emailRedirectTo: window.location.origin + "/account" },
            })
          : mode === "reset"
            ? await db.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + "/account",
              })
            : await db.auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      setMessage(
        mode === "signup"
          ? "Check your email to confirm your account, then sign in."
          : mode === "reset"
            ? "If that account exists, a password reset email has been requested."
            : "Signed in.",
      );
      await load();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    try {
      const password = String(new FormData(e.currentTarget).get("password"));
      const { error } = await browserDB().auth.updateUser({ password });
      if (error) throw error;
      setMessage("Password updated.");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function remove(type: string, id: string) {
    if (
      !window.confirm(
        "Delete this contribution? Deleting a discussion also removes its replies.",
      )
    )
      return;
    setBusy(true);
    try {
      await manage("own.delete", { type, id });
      await load();
      setMessage("Contribution deleted.");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function edit(type: string, item: Thread | Reply) {
    const content = window.prompt(
      "Edit your contribution. Changes return it to moderator review.",
      item.content,
    );
    if (content === null) return;
    setBusy(true);
    try {
      await manage("own.edit", { type, id: item.id, content });
      await load();
      setMessage("Changes saved for review.");
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="editorial">
      {signed ? (
        <>
          <div className="toolbar">
            <p>You are signed in.</p>
            <button
              className="buttonSecondary"
              disabled={busy}
              onClick={async () => {
                await browserDB().auth.signOut();
                await load();
              }}
            >
              Sign out
            </button>
          </div>
          {dashboard && (
            <>
              <div className="actions">
                <Link className="button" href="/forum">
                  Visit the community
                </Link>
                {dashboard.role !== "member" && (
                  <Link className="buttonSecondary" href="/admin">
                    Publishing & moderation
                  </Link>
                )}
              </div>
              <h2>Your discussions</h2>
              {dashboard.threads.length === 0 && (
                <p>No discussions submitted yet.</p>
              )}
              {dashboard.threads.map((t) => (
                <article key={t.id} className="card">
                  <h3>
                    {t.status === "published" ? (
                      <Link href={`/forum/${t.id}`}>{t.title}</Link>
                    ) : (
                      t.title
                    )}
                  </h3>
                  <p>
                    {t.status} · {t.category}
                  </p>
                  <div className="actions">
                    <button disabled={busy} onClick={() => edit("thread", t)}>
                      Edit
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => remove("thread", t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
              <h2>Your replies</h2>
              {dashboard.replies.map((r) => (
                <article className="card" key={r.id}>
                  <p>{r.content}</p>
                  <p>{r.status}</p>
                  <div className="actions">
                    <Link href={`/forum/${r.thread_id}`}>View discussion</Link>
                    <button disabled={busy} onClick={() => edit("reply", r)}>
                      Edit
                    </button>
                    <button
                      disabled={busy}
                      onClick={() => remove("reply", r.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
              <h2>Saved discussions</h2>
              {dashboard.bookmarks.map((b) => (
                <p key={b.thread_id}>
                  {b.bpt_threads ? (
                    <Link className="textLink" href={`/forum/${b.thread_id}`}>
                      {b.bpt_threads.title}
                    </Link>
                  ) : (
                    "Discussion is no longer available."
                  )}
                </p>
              ))}
            </>
          )}
          <details>
            <summary>Change your password</summary>
            <form className="editorForm" onSubmit={changePassword}>
              <label>
                New password
                <input
                  name="password"
                  type="password"
                  minLength={12}
                  required
                  autoComplete="new-password"
                />
              </label>
              <button className="button" disabled={busy}>
                Update password
              </button>
            </form>
          </details>
        </>
      ) : (
        <>
          <div className="actions">
            {[
              ["signin", "Sign in"],
              ["signup", "Create account"],
              ["reset", "Reset password"],
            ].map(([v, l]) => (
              <button
                key={v}
                className={mode === v ? "button" : "buttonSecondary"}
                onClick={() => setMode(v)}
              >
                {l}
              </button>
            ))}
          </div>
          <form className="editorForm card" onSubmit={auth}>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            {mode !== "reset" && (
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  required
                  minLength={mode === "signup" ? 12 : 1}
                  autoComplete={
                    mode === "signup" ? "new-password" : "current-password"
                  }
                />
              </label>
            )}
            {mode === "signup" && (
              <label className="checkLabel">
                <input type="checkbox" required />I agree to the{" "}
                <Link href="/terms-conditions">terms</Link> and have read the{" "}
                <Link href="/privacy-policy">privacy policy</Link>.
              </label>
            )}
            <button className="button" disabled={busy}>
              {busy
                ? "Please wait…"
                : mode === "signin"
                  ? "Sign in"
                  : mode === "signup"
                    ? "Create account"
                    : "Send reset email"}
            </button>
          </form>
        </>
      )}
      <p className="feedback" role="status">
        {message}
      </p>
    </div>
  );
}
