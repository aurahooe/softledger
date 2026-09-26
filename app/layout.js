import "./globals.css";
import Link from "next/link";
import { serverClient } from "../lib/supabase-server";

export const metadata = {
  title: "Soft Ledger",
  description: "A small public wall. Private drafts stay in the drawer."
};

export default async function RootLayout({ children }) {
  const supabase = serverClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body>
        <div className="wrap">
          <header className="top">
            <Link className="mark" href="/">Soft Ledger</Link>
            <nav className="nav">
              <Link href="/">Wall</Link>
              {user ? <Link href="/desk">Desk</Link> : <Link href="/login">Sign in</Link>}
              {user ? <Link href="/auth/signout">Leave</Link> : null}
            </nav>
          </header>
          {children}
          <footer>Public slips stay on the wall. The hour turns itself.</footer>
        </div>
      </body>
    </html>
  );
}
