"use server";

import { redirect } from "next/navigation";
import { auth, unstable_update } from "@/auth";
import { completeProfile } from "@/lib/db";

function safePath(raw: FormDataEntryValue | null) {
  const s = String(raw ?? "");
  return s.startsWith("/") && !s.startsWith("//") ? s : "/";
}

export async function register(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const givenName = String(formData.get("givenName") ?? "").trim();
  const familyName = String(formData.get("familyName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").replace(/[\s.-]/g, "");
  const callbackUrl = safePath(formData.get("callbackUrl"));

  const errors: string[] = [];
  if (givenName.length < 2) errors.push("prenom");
  if (familyName.length < 2) errors.push("nom");
  if (phone && !/^(\+?\d{6,15})$/.test(phone)) errors.push("tel");
  if (errors.length) {
    const url = new URL("/inscription", "http://x");
    url.searchParams.set("callbackUrl", callbackUrl);
    url.searchParams.set("erreur", errors.join(","));
    redirect(url.pathname + url.search);
  }

  completeProfile(session.user.id, { givenName, familyName, phone });
  await unstable_update({ registered: true } as unknown as Parameters<typeof unstable_update>[0]);
  redirect(callbackUrl);
}
