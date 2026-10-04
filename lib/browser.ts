"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
let client: SupabaseClient | undefined;
export function browserDB() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL,
    key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Account services are not configured yet.");
  return (client ??= createClient(url, key, {
    auth: { storageKey: "bpt-community-auth" },
  }));
}
export async function manage(action: string, payload: unknown = {}) {
  const { data } = await browserDB().auth.getSession();
  if (!data.session) throw new Error("Please sign in to continue.");
  const res = await fetch("/api/manage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.session.access_token}`,
    },
    body: JSON.stringify({ action, payload }),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Unable to save changes.");
  return result;
}
