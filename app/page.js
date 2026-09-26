import { serverClient } from "../lib/supabase-server";
import { editionFor, hourKey } from "../lib/hour";
import HourTick from "./hour-tick";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = serverClient();
  const key = hourKey();
  const { data: hourRow } = await supabase.from("soft_hours").select("*").eq("hour_key", key).maybeSingle();
  const edition = hourRow || { ...editionFor(key), hour_key: key };
  const { data: slips } = await supabase
    .from("soft_slips")
    .select("id, body, created_at, user_id")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(24);
  const ids = [...new Set((slips || []).map((s) => s.user_id))];
  let handles = {};
  if (ids.length) {
    const { data: profiles } = await supabase.from("soft_profiles").select("id, handle").in("id", ids);
    (profiles || []).forEach((p) => { handles[p.id] = p.handle; });
  }
  return (
    <>
      <section className="hero">
        <h1>{edition.title}</h1>
        <p className="lede">{edition.body}</p>
        <p style={{ marginTop: 16 }}><HourTick /></p>
      </section>
      <section className="grid">
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <h2>On the wall</h2>
            <p>Anything marked public lands here. Private drafts never leave the desk.</p>
          </div>
          <div className="slips">
            {(slips || []).length === 0 && <div className="card"><p>The wall is empty this hour. Pin something from your desk.</p></div>}
            {(slips || []).map((s, i) => (
              <Link key={s.id} href={`/s/${s.id}`} className="slip" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="meta">{handles[s.user_id] || "anon"} · {new Date(s.created_at).toUTCString().slice(5, 22)}</div>
                <div>{s.body.length > 220 ? s.body.slice(0, 220) + "…" : s.body}</div>
              </Link>
            ))}
          </div>
        </div>
        <aside className="card">
          <h2>This hour</h2>
          <p style={{ marginBottom: 16 }}>{edition.title}. The prompt changes when the clock does.</p>
          <Link className="btn" href="/desk">Write at the desk</Link>
        </aside>
      </section>
    </>
  );
}
