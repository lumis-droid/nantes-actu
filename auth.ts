import NextAuth from "next-auth";
import { headers } from "next/headers";
import authConfig from "./auth.config";
import { recordLogin } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email) {
        const h = await headers();
        const forwarded = h.get("x-forwarded-for");
        recordLogin({
          googleId: String(profile.sub ?? ""),
          email: profile.email,
          name: profile.name ?? "",
          givenName: (profile.given_name as string | undefined) ?? "",
          familyName: (profile.family_name as string | undefined) ?? "",
          image: (profile.picture as string | undefined) ?? "",
          ip: forwarded?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "",
          userAgent: h.get("user-agent") ?? "",
        });
      }
      return true;
    },
  },
});
