import { NextResponse } from "next/server";
import { serverClient } from "../../../lib/supabase-server";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code) {
    const supabase = serverClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(new URL("/desk", url.origin));
}
