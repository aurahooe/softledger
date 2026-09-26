"use client";
import { useEffect, useState } from "react";
import { msToNextHour } from "../lib/hour";

export default function HourTick() {
  const [ms, setMs] = useState(msToNextHour());
  useEffect(() => {
    const id = setInterval(() => {
      const n = msToNextHour();
      setMs(n);
      if (n < 1200) window.location.reload();
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return <span className="tick">next hour in {m}:{String(s).padStart(2, "0")}</span>;
}
