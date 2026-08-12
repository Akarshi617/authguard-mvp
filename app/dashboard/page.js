"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthStore from "@/store/useAuthStore";

export default function DashboardPage() {
  const router = useRouter();
  const { user, setUser, clearUser } = useAuthStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email,
        });
        setCheckingAuth(false);
      } else {
        clearUser();
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router, setUser, clearUser]);

  const handleLogout = async () => {
    await signOut(auth);
    clearUser();
    document.cookie = "session=; path=/; max-age=0";
    router.push("/login");
  };

  if (checkingAuth) {
    return (
      <main className="bp-canvas">
        <p className="bp-check">Verifying session…</p>
      </main>
    );
  }

  return (
    <main className="bp-canvas">
      <div className="bp-sheet">
        <div className="bp-sheet-header">
          <span className="bp-sheet-id">AUTH&nbsp;—&nbsp;03</span>
          <span className="bp-sheet-rev">REV 1.0</span>
        </div>

        <h1 className="bp-sheet-title">Dashboard</h1>
        <p className="bp-sheet-sub">
          Route guarded by onAuthStateChanged — this sheet only renders once
          Firebase confirms a live session.
        </p>

        <div className="bp-form">
          <div className="bp-field">
            <span className="bp-label">Signed in as</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}>
              {user?.name}
            </span>
          </div>
          <div className="bp-field">
            <span className="bp-label">Email</span>
            <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem" }}>
              {user?.email}
            </span>
          </div>

          <button onClick={handleLogout} className="bp-button bp-button--ghost">
            Log out
          </button>
        </div>

        <dl className="bp-titleblock">
          <div className="bp-kv">
            <dt>Project</dt>
            <dd>Auth Walking Skeleton</dd>
          </div>
          <div className="bp-kv">
            <dt>Sheet</dt>
            <dd>3 of 3 — Dashboard</dd>
          </div>
          <div className="bp-kv">
            <dt>Session UID</dt>
            <dd>{user?.uid?.slice(0, 12) || "—"}…</dd>
          </div>
          <div className="bp-kv">
            <dt>Guard</dt>
            <dd>onAuthStateChanged</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}