# Sprint 14 — Next.js Authentication Architecture & Route Guards

Track A (Frontend Specialist) walking skeleton: routing + auth state management
using Next.js App Router, Firebase Auth, and Zustand.

## Repository

📦 https://github.com/Akarshi617/authguard-mvp

## Explore the App

- **`/register`** — Create a new account with email/password (Firebase `createUserWithEmailAndPassword`)
- **`/login`** — Sign in with an existing account (Firebase `signInWithEmailAndPassword`)
- **`/dashboard`** — Protected route; try visiting it while logged out to see the edge middleware redirect you back to `/login`
- **Refresh test** — Log in, then refresh `/dashboard` — the client-side `onAuthStateChanged` check re-hydrates the Zustand store so you stay logged in
- **Logout flow** — Clears the session cookie and Zustand state, then redirects to `/login`
- **Zustand store** — Inspect `store/useAuthStore.js` to see how `user` (`uid`, `email`, `name`) is shared across components without re-querying Firebase

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a Firebase project at https://console.firebase.google.com
   - Enable **Authentication -> Sign-in method -> Email/Password**
   - Copy your web app config from Project Settings
3. Copy the env template and fill in your Firebase keys:
   ```bash
   cp .env.local.example .env.local
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## What's implemented (maps to the sprint phases)

**Phase 1 — Base Architecture**
- `/login`, `/register`, `/dashboard` routes scaffolded in `app/`
- Login and Register forms with working `useState` form state management

**Phase 2 — State & Integration**
- `lib/firebase.js` initializes Firebase Auth
- Register page calls `createUserWithEmailAndPassword`
- Login page calls `signInWithEmailAndPassword`

**Phase 3 — Advanced Optimization**
- `middleware.js` checks a session cookie at the edge and redirects
  unauthenticated requests to `/dashboard` back to `/login`
- Dashboard also does a client-side check via `onAuthStateChanged` (double
  guard, and it re-hydrates state on refresh)
- On successful login/register, the user payload (`uid`, `email`, `name`) is
  serialized into the Zustand store (`store/useAuthStore.js`) so any
  component can read `useAuthStore((s) => s.user)` without re-querying
  Firebase

## Next steps before submitting

- Swap the placeholder styling for something presentable (not required for
  P0/P1, but makes the demo video look better)
- Record the 2-3 min walkthrough video
- Deploy to Vercel and grab the live link
- Push to a **public** GitHub repo

## Live Demo

🔗 [Live App]# Sprint 14 — Next.js Authentication Architecture & Route Guards

Track A (Frontend Specialist) walking skeleton: routing + auth state management
using Next.js App Router, Firebase Auth, and Zustand.

## Repository

📦 [GitHub Repo](https://github.com/your-username/your-repo-name) *(replace with your actual public repo URL)*

## Explore the App

- **`/register`** — Create a new account with email/password (Firebase `createUserWithEmailAndPassword`)
- **`/login`** — Sign in with an existing account (Firebase `signInWithEmailAndPassword`)
- **`/dashboard`** — Protected route; try visiting it while logged out to see the edge middleware redirect you back to `/login`
- **Refresh test** — Log in, then refresh `/dashboard` — the client-side `onAuthStateChanged` check re-hydrates the Zustand store so you stay logged in
- **Logout flow** — Clears the session cookie and Zustand state, then redirects to `/login`
- **Zustand store** — Inspect `store/useAuthStore.js` to see how `user` (`uid`, `email`, `name`) is shared across components without re-querying Firebase

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a Firebase project at https://console.firebase.google.com
   - Enable **Authentication -> Sign-in method -> Email/Password**
   - Copy your web app config from Project Settings
3. Copy the env template and fill in your Firebase keys:
   ```bash
   cp .env.local.example .env.local
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## What's implemented (maps to the sprint phases)

**Phase 1 — Base Architecture**
- `/login`, `/register`, `/dashboard` routes scaffolded in `app/`
- Login and Register forms with working `useState` form state management

**Phase 2 — State & Integration**
- `lib/firebase.js` initializes Firebase Auth
- Register page calls `createUserWithEmailAndPassword`
- Login page calls `signInWithEmailAndPassword`

**Phase 3 — Advanced Optimization**
- `middleware.js` checks a session cookie at the edge and redirects
  unauthenticated requests to `/dashboard` back to `/login`
- Dashboard also does a client-side check via `onAuthStateChanged` (double
  guard, and it re-hydrates state on refresh)
- On successful login/register, the user payload (`uid`, `email`, `name`) is
  serialized into the Zustand store (`store/useAuthStore.js`) so any
  component can read `useAuthStore((s) => s.user)` without re-querying
  Firebase

## Next steps before submitting

- Swap the placeholder styling for something presentable (not required for
  P0/P1, but makes the demo video look better)
- Record the 2-3 min walkthrough video
- Deploy to Vercel and grab the live link
- Push to a **public** GitHub repo

## Live Demo

🔗 https://authguard-mvp.vercel.app/

## Author

Developed by Akarshi Agrahari

