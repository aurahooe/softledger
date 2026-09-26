"use client";
import { useState } from "react";
import { browserClient } from "../../lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [mode, setMode] = useState("in");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    const sb = browserClient();
    if (mode === "in") {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) return setErr(error.message);
    } else {
      const { data, error } = await sb.auth.signUp({ email, password });
      if (error) return setErr(error.message);
      if (data.user) {
        const h = (handle || email.split("@")[0]).replace(/[^a-zA-Z0-9_]/g, "").slice(0, 24) || "desk";
        await sb.from("soft_profiles").upsert({ id: data.user.id, handle: h });
      }
    }
    router.push("/desk");
    router.refresh();
  }

  return (
    <section className="hero" style={{ maxWidth: 420 }}>
      <h1>{mode === "in" ? "Come in." : "Take a desk."}</h1>
      <p className="lede">Email and a password. That is the whole lock.</p>
      <form className="form" onSubmit={submit} style={{ marginTop: 24 }}>
        <input type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" required minLength={8} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {mode === "up" && (
          <input placeholder="handle" value={handle} onChange={(e) => setHandle(e.target.value)} />
        )}
        {err && <div className="err">{err}</div>}
        <div className="row">
          <button type="submit">{mode === "in" ? "Enter" : "Create desk"}</button>
          <button type="button" className="ghost" onClick={() => setMode(mode === "in" ? "up" : "in")}>
            {mode === "in" ? "Need a desk" : "I already have one"}
          </button>
        </div>
      </form>
    </section>
  );
}
