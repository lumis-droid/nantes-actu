import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Configuration "légère" (sans accès base de données) partagée entre
 * le middleware (edge) et le handler complet dans auth.ts.
 */
export default {
  providers: [Google],
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      // Pages accessibles sans compte Google : la page de connexion
      // et l'espace admin (protégé par son propre mot de passe).
      if (pathname === "/login" || pathname.startsWith("/admin")) return true;
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
