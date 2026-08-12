"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthStore from "@/store/useAuthStore";

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, { displayName: formData.name });

      const { uid, email } = userCredential.user;
      setUser({ uid, email, name: formData.name });

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
          <span className="bp-sheet-id">AUTH&nbsp;—&nbsp;02</span>
          <span className="bp-sheet-rev">REV 1.0</span>
        </div>

        <h1 className="bp-sheet-title">Register</h1>
        <p className="bp-sheet-sub">
          Provisions a new Firebase user and writes the first record to the
          session store.
        </p>

        <form onSubmit={handleSubmit} className="bp-form">
          <div className="bp-field">
            <label htmlFor="name" className="bp-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ada Lovelace"
              className="bp-input"
              required
            />
          </div>

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
              placeholder="min. 6 characters"
              className="bp-input"
              required
              minLength={6}
            />
          </div>

          {error && <p className="bp-error">{error}</p>}

          <button type="submit" disabled={loading} className="bp-button">
            {loading ? "Provisioning…" : "Create account →"}
          </button>

          <a href="/login" className="bp-link">
            Already have an account? Log in →
          </a>
        </form>

        <dl className="bp-titleblock">
          <div className="bp-kv">
            <dt>Project</dt>
            <dd>Auth Walking Skeleton</dd>
          </div>
          <div className="bp-kv">
            <dt>Sheet</dt>
            <dd>2 of 3 — Register</dd>
          </div>
        </dl>
      </div>
    </main>
  );
}