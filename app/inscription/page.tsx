import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LogoMark } from "@/components/Logo";
import { getMember } from "@/lib/db";
import { register } from "./actions";

export const metadata: Metadata = { title: "Inscription" };
export const dynamic = "force-dynamic";

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; erreur?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const { callbackUrl, erreur } = await searchParams;
  const member = getMember(session.user.id);
  const errors = new Set((erreur ?? "").split(",").filter(Boolean));

  return (
    <div className="login">
      <div className="login__card login__card--form">
        <LogoMark size={56} />
        <h1 className="login__title">Finalisez votre inscription</h1>
        <p className="login__text">
          Encore une étape, <strong>{session.user.email}</strong>. Ces informations nous permettent de
          personnaliser votre lecture de Nantes Actu.
        </p>
        <form action={register} className="admin-form">
          <input type="hidden" name="callbackUrl" value={callbackUrl?.startsWith("/") ? callbackUrl : "/"} />
          <div className="form-row">
            <div>
              <label htmlFor="givenName" className="admin-form__label">Prénom *</label>
              <input
                id="givenName"
                name="givenName"
                required
                minLength={2}
                defaultValue={member?.given_name ?? ""}
                autoComplete="given-name"
                className={`admin-form__input ${errors.has("prenom") ? "is-invalid" : ""}`}
              />
            </div>
            <div>
              <label htmlFor="familyName" className="admin-form__label">Nom *</label>
              <input
                id="familyName"
                name="familyName"
                required
                minLength={2}
                defaultValue={member?.family_name ?? ""}
                autoComplete="family-name"
                className={`admin-form__input ${errors.has("nom") ? "is-invalid" : ""}`}
              />
            </div>
          </div>
          <label htmlFor="phone" className="admin-form__label">
            Numéro de téléphone <span className="optional">(facultatif)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={member?.phone ?? ""}
            placeholder="06 12 34 56 78"
            autoComplete="tel"
            className={`admin-form__input ${errors.has("tel") ? "is-invalid" : ""}`}
          />
          {errors.size > 0 && (
            <p className="login__error">
              {errors.has("tel")
                ? "Le numéro de téléphone n'est pas valide."
                : "Merci de renseigner votre prénom et votre nom."}
            </p>
          )}
          <button type="submit" className="button">Terminer mon inscription</button>
        </form>
        <p className="login__legal">
          Vos informations sont conservées uniquement pour gérer votre compte Nantes Actu.
        </p>
      </div>
    </div>
  );
}
