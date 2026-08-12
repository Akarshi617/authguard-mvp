import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Sprint 14 — Auth Walking Skeleton</h1>
      <p>
        <Link href="/login">Go to Login</Link>
      </p>
      <p>
        <Link href="/register">Go to Register</Link>
      </p>
    </main>
  );
}
