"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthStore from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const { uid, email, displayName } = userCredential.user;
      setUser({ uid, email, name: displayName || email });

      document.cookie = `session=${uid}; path=/; max-age=3600`;

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bp-canvas">
      <div className="bp-sheet">
        <div className="bp-sheet-header">
          <span className="bp-sheet-id">AUTH&nbsp;—&nbsp;01</span>
          <span className="bp-sheet-rev">REV 1.0</span>
        </div>

        <h1 className="bp-sheet-title">Log in</h1>
        <p className="bp-sheet-sub">
          Authenticate against the existing session store to access the
          dashboard route.
        </p>

        <form onSubmit={handleSubmit} className="bp-form">
          <div className="bp-field">
            <label htmlFor="email" className="bp-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@company.com"
              className="bp-input"
              required
            />
          </div>

          <div className="bp-field">
            <label htmlFor="password" className="bp-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bp-input"
              required
            />
          </div>

          {error && <p className="bp-error">{error}</p>}

          <button type="submit" disabled={loading} className="bp-button">
            {loading ? "Verifying…" : "Enter system →"}
          </button>

          <a href="/register" className="bp-link">
            No account on file? Register →
          </a>
        </form>

        <dl className="bp-titleblock">
          <div className="bp-kv">
            <dt>Project</dt>
            <dd>Auth Walking Skeleton</dd>
          </div>
          <div className="bp-kv">
            <dt>Sheet</dt>
            <dd>1 of 3 — Login</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}