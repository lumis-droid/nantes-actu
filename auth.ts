import NextAuth from "next-auth";
import { headers } from "next/headers";
import authConfig from "./auth.config";
import { isRegistered, recordLogin } from "@/lib/db";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email && profile.sub) {
        const h = await headers();
        const forwarded = h.get("x-forwarded-for");
        recordLogin({
          googleId: profile.sub,
          email: profile.email,
          name: profile.name ?? "",
          givenName: (profile.given_name as string | undefined) ?? "",
          familyName: (profile.family_name as string | undefined) ?? "",
          image: (profile.picture as string | undefined) ?? "",
          locale: (profile.locale as string | undefined) ?? h.get("accept-language")?.split(",")[0] ?? "",
          emailVerified: profile.email_verified === true,
          ip: forwarded?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "",
          userAgent: h.get("user-agent") ?? "",
        });
      }
      return true;
    },
    async jwt({ token, profile, trigger, session }) {
      // À la connexion : on mémorise si la fiche d'inscription est déjà complète.
      if (profile?.sub) token.registered = isRegistered(profile.sub);
      // Après le formulaire d'inscription : unstable_update({ registered: true }).
      if (trigger === "update" && session?.registered === true) token.registered = true;
      return token;
    },
  },
});
