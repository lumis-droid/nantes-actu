import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { LogoMark } from "@/components/Logo";
import { GoogleIcon } from "@/components/GoogleIcon";

export const metadata: Metadata = { title: "Connexion" };

/** N'accepte que des chemins internes (relatifs ou même origine). */
function safeTarget(raw?: string) {
  if (!raw) return "/";
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  try {
    const u = new URL(raw);
    return u.pathname + u.search;
  } catch {
    return "/";
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const session = await auth();
  const { callbackUrl, error } = await searchParams;
  const target = safeTarget(callbackUrl);
  if (session?.user) redirect(target);

  return (
    <div className="login">
      <div className="login__card">
        <LogoMark size={64} />
        <h1 className="login__title">
          Bienvenue sur <em>Nantes Actu</em>
        </h1>
        <p className="login__text">
          Pour lire le journal, connectez-vous avec votre compte Google. C'est gratuit et sans engagement.
        </p>
        {error && (
          <p className="login__error">La connexion a échoué. Veuillez réessayer.</p>
        )}
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: target });
          }}
        >
          <button type="submit" className="google-button">
            <GoogleIcon />
            Continuer avec Google
          </button>
        </form>
        <p className="login__legal">
          En vous connectant, vous acceptez que votre nom et votre adresse e-mail soient enregistrés pour gérer votre accès.
        </p>
      </div>
    </div>
  );
}
