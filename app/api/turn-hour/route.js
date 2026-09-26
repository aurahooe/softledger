import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { editionFor, hourKey } from "../../../lib/hour";

export const dynamic = "force-dynamic";

export async function GET() {
  const key = hourKey();
  const edition = editionFor(key);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const sb = createClient(url, anon);
  await sb.from("soft_hours").upsert({ hour_key: key, title: edition.title, body: edition.body }, { onConflict: "hour_key" });
  return NextResponse.json({ ok: true, key, edition });
}
