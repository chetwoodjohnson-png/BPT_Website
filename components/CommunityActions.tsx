"use client";
import { useState } from "react";
import Link from "next/link";
import { manage } from "@/lib/browser";
import { CATEGORIES } from "@/lib/platform";
export default function CommunityActions({
  threadId,
  locked = false,
}: {
  threadId?: string;
  locked?: boolean;
}) {
  const [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false),
    [report, setReport] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const form = e.currentTarget,
      p = Object.fromEntries(new FormData(form));
    try {
      await manage(
        report ? "report" : threadId ? "reply.create" : "thread.create",
        { ...p, id: threadId },
      );
      setMessage(
        report
          ? "Report received. A moderator will review it."
          : "Saved. Your contribution will appear after moderator review.",
      );
      form.reset();
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="card editorial">
      <h2 className="cardTitle">
        {report
          ? "Report this discussion"
          : threadId
            ? "Join the conversation"
            : "Start a discussion"}
      </h2>
      <p>
        <Link className="textLink" href="/account">
          Sign in or create an account
        </Link>{" "}
        to contribute. Keep discussions constructive and protect client privacy.
        Posts and replies are reviewed before publication.
      </p>
      {(!locked || report) && (
        <form onSubmit={submit} className="editorForm">
          {report ? (
            <label>
              Reason (include reply author if relevant)
              <textarea name="reason" required minLength={5} maxLength={1000} />
            </label>
          ) : (
            <>
              <label>
                Public display name
                <input
                  name="author"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="nickname"
                />
              </label>
              {!threadId && (
                <>
                  <label>
                    Title
                    <input
                      name="title"
                      required
                      minLength={3}
                      maxLength={180}
                    />
                  </label>
                  <label>
                    Category
                    <select name="category">
                      {CATEGORIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                </>
              )}
              <label>
                {threadId ? "Your reply" : "Your question or experience"}
                <textarea
                  name="content"
                  required
                  minLength={threadId ? 2 : 10}
                  maxLength={threadId ? 10000 : 15000}
                  rows={6}
                />
              </label>
            </>
          )}
          <button className="button" disabled={busy}>
            {busy ? "Saving…" : report ? "Submit report" : "Submit for review"}
          </button>
        </form>
      )}
      {locked && !report && (
        <p>This discussion is locked. Replies are closed.</p>
      )}
      {threadId && (
        <div className="actions">
          <button
            className="buttonSecondary"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await manage("bookmark.toggle", { id: threadId });
                setMessage(
                  "Saved discussions updated. View them in your account.",
                );
              } catch (e) {
                setMessage((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            Save / unsave discussion
          </button>
          <button
            className="buttonSecondary"
            onClick={() => setReport(!report)}
          >
            {report ? "Cancel report" : "Report abuse"}
          </button>
        </div>
      )}
      <p role="status" className="feedback">
        {message}
      </p>
    </div>
  );
}
