import { serverClient } from "../../../lib/supabase-server";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Slip({ params }) {
  const supabase = serverClient();
  const { data: slip } = await supabase.from("soft_slips").select("*").eq("id", params.id).maybeSingle();
  if (!slip || !slip.is_public) notFound();
  const { data: profile } = await supabase.from("soft_profiles").select("handle").eq("id", slip.user_id).maybeSingle();
  return (
    <section className="hero" style={{ maxWidth: 640 }}>
      <p className="tick">{profile?.handle || "anon"} · {new Date(slip.created_at).toUTCString()}</p>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", marginTop: 16 }}>{slip.body}</h1>
      <p style={{ marginTop: 28 }}><Link href="/">Back to the wall</Link></p>
    </section>
  );
}
