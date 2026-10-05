import Link from "next/link";
import { auth, signOut } from "@/auth";
import { CATEGORIES } from "@/lib/articles";
import { Logo } from "./Logo";

export async function Header() {
  const session = await auth();
  const user = session?.user;
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="header">
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__date">{today}</span>
          <span className="topbar__edition">Édition du matin · Nantes & métropole</span>
          <div className="topbar__user">
            {user ? (
              <>
                {user.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="avatar" width={24} height={24} />
                )}
                <span>{user.name}</span>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/login" });
                  }}
                >
                  <button type="submit" className="link-button">Se déconnecter</button>
                </form>
              </>
            ) : (
              <Link href="/login" className="link-button">Se connecter</Link>
            )}
          </div>
        </div>
      </div>

      <div className="container masthead">
        <Logo />
      </div>

      <nav className="nav" aria-label="Rubriques">
        <div className="container nav__inner">
          <Link href="/" className="nav__link nav__link--home">À la une</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/rubrique/${c.slug}`} className="nav__link">
              {c.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
