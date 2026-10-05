import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { NextResponse } from "next/server";

/**
 * Configuration "légère" (sans accès base de données) partagée entre
 * le middleware (edge) et le handler complet dans auth.ts.
 */
export default {
  providers: [Google],
  // Derrière le proxy de Railway, l'hôte vient des en-têtes x-forwarded-* : on lui fait confiance.
  trustHost: true,
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, token }) {
      const t = token as { registered?: boolean };
      Object.assign(session.user, { registered: t.registered === true });
      return session;
    },
    authorized({ auth, request }) {
      const { pathname, search } = request.nextUrl;
      const user = auth?.user as { registered?: boolean } | undefined;

      // Toujours accessibles : la connexion et l'admin (protégé par son propre mot de passe).
      if (pathname === "/login" || pathname.startsWith("/admin")) return true;

      // Les pages article s'affichent sans compte : c'est la fenêtre d'inscription
      // qui bloque la lecture (voir app/article/[slug]/page.tsx).
      if (!user) return pathname.startsWith("/article/");

      // Connecté avec Google mais fiche incomplète : on passe par l'inscription.
      if (!user.registered && pathname !== "/inscription") {
        const url = new URL("/inscription", request.nextUrl);
        url.searchParams.set("callbackUrl", pathname + search);
        return NextResponse.redirect(url);
      }
      if (user.registered && pathname === "/inscription") {
        return NextResponse.redirect(new URL("/", request.nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
