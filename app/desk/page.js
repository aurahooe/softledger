import { serverClient } from "../../lib/supabase-server";
import { redirect } from "next/navigation";
import Composer from "./composer";
import Toggle from "./toggle";

export const dynamic = "force-dynamic";

export default async function Desk() {
  const supabase = serverClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: slips } = await supabase
    .from("soft_slips")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
  return (
    <>
      <section className="hero">
        <h1>Your drawer.</h1>
        <p className="lede">Nothing leaves unless you mark it public.</p>
      </section>
      <section className="grid">
        <div className="card"><Composer /></div>
        <div className="slips">
          {(slips || []).map((s) => (
            <div key={s.id} className="slip">
              <div className="meta">{s.is_public ? "on the wall" : "private"} · {new Date(s.created_at).toUTCString().slice(5, 22)}</div>
              <div style={{ marginBottom: 10 }}>{s.body}</div>
              <Toggle id={s.id} isPublic={s.is_public} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
