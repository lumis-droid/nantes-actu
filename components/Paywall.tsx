import { signIn } from "@/auth";
import { LogoMark } from "./Logo";
import { GoogleIcon } from "./GoogleIcon";

/**
 * Fenêtre bloquante affichée par-dessus un article quand le visiteur
 * n'est pas connecté : inscription via Google, puis retour sur l'article.
 */
export function Paywall({ redirectTo }: { redirectTo: string }) {
  return (
    <div className="paywall" role="dialog" aria-modal="true" aria-labelledby="paywall-title">
      <div className="paywall__card">
        <LogoMark size={52} />
        <p className="kicker">Article réservé aux membres</p>
        <h2 id="paywall-title" className="paywall__title">
          Inscrivez-vous gratuitement pour lire la suite
        </h2>
        <p className="paywall__text">
          Créez votre compte Nantes Actu en quelques secondes avec Google. Vous retrouverez cet
          article juste après.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo });
          }}
        >
          <button type="submit" className="google-button">
            <GoogleIcon />
            S'inscrire avec Google
          </button>
        </form>
        <p className="login__legal">Déjà membre ? Le même bouton vous connecte.</p>
      </div>
    </div>
  );
}
