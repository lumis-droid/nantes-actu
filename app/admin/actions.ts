"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, checkPassword, makeAdminToken } from "@/lib/admin-session";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    redirect("/admin?erreur=1");
  }
  const store = await cookies();
  store.set(ADMIN_COOKIE, makeAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 8 * 60 * 60,
  });
  redirect("/admin");
}

export async function logoutAdmin() {
  const store = await cookies();
  store.delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin");
}
