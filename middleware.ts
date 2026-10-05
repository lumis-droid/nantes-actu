import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Tout le site est protégé sauf les routes d'auth et les fichiers statiques.
  matcher: ["/((?!api/auth|_next/static|_next/image|icon.svg|logo.svg|favicon.ico).*)"],
};
