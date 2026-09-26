import { NextResponse } from "next/server";
import { serverClient } from "../../../lib/supabase-server";

export async function GET(request) {
  const supabase = serverClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/", request.url));
}
