"use client";
import { useState } from "react";
import { browserClient } from "../../lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function Composer() {
  const [body, setBody] = useState("");
  const [pub, setPub] = useState(true);
  const [err, setErr] = useState("");
  const router = useRouter();

  async function save(e) {
    e.preventDefault();
    setErr("");
    const sb = browserClient();
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return setErr("Sign in first.");
    const { error } = await sb.from("soft_slips").insert({ user_id: user.id, body: body.trim(), is_public: pub });
    if (error) return setErr(error.message);
    setBody("");
    router.refresh();
  }

  return (
    <form className="form" onSubmit={save}>
      <textarea required maxLength={2800} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write the thing. Mark it public if the wall should keep it." />
      <label className="row" style={{ fontSize: 14, color: "var(--mute)" }}>
        <input type="checkbox" checked={pub} onChange={(e) => setPub(e.target.checked)} />
        show on the public wall
      </label>
      {err && <div className="err">{err}</div>}
      <button type="submit">Keep this</button>
    </form>
  );
}
