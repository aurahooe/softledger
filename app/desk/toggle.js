"use client";
import { browserClient } from "../../lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function Toggle({ id, isPublic }) {
  const router = useRouter();
  async function run() {
    const sb = browserClient();
    await sb.from("soft_slips").update({ is_public: !isPublic }).eq("id", id);
    router.refresh();
  }
  return (
    <button className="ghost" type="button" onClick={run}>
      {isPublic ? "take off wall" : "pin to wall"}
    </button>
  );
}
