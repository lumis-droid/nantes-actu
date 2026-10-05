import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container login">
      <div className="login__card">
        <h1 className="login__title">Page introuvable</h1>
        <p className="login__text">Cette page n'existe pas ou a été déplacée.</p>
        <Link href="/" className="button">Retour à la une</Link>
      </div>
    </div>
  );
}
