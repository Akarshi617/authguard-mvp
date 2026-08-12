import { NextResponse } from "next/server";

// Guards /dashboard at the edge. Firebase's client SDK doesn't expose auth
// state to middleware directly, so login/register set a lightweight
// "session" cookie on success, and this middleware checks for it.
// (The dashboard page also does a client-side check via onAuthStateChanged
// as a second layer, since the cookie alone isn't cryptographically verified.)
export function middleware(request) {
  const session = request.cookies.get("session");

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
