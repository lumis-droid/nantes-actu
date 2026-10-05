import type { Metadata } from "next";
import { isAdmin } from "@/lib/admin-session";
import { listLogins, listMembers, stats } from "@/lib/db";
import { loginAdmin, logoutAdmin } from "./actions";

export const metadata: Metadata = { title: "Administration" };
export const dynamic = "force-dynamic";

function fmt(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function shortUA(ua: string) {
  if (!ua) return "—";
  const browser =
    /Edg\//.test(ua) ? "Edge" :
    /OPR\//.test(ua) ? "Opera" :
    /Chrome\//.test(ua) ? "Chrome" :
    /Firefox\//.test(ua) ? "Firefox" :
    /Safari\//.test(ua) ? "Safari" : "Navigateur";
  const os =
    /iPhone|iPad/.test(ua) ? "iOS" :
    /Android/.test(ua) ? "Android" :
    /Mac OS X/.test(ua) ? "macOS" :
    /Windows/.test(ua) ? "Windows" :
    /Linux/.test(ua) ? "Linux" : "";
  return os ? `${browser} · ${os}` : browser;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <div className="login">
        <div className="login__card">
          <h1 className="login__title">Espace d'administration</h1>
          <p className="login__text">Cet espace est réservé à la rédaction. Saisissez le mot de passe pour continuer.</p>
          {erreur && <p className="login__error">Mot de passe incorrect.</p>}
          <form action={loginAdmin} className="admin-form">
            <label htmlFor="password" className="admin-form__label">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="admin-form__input"
            />
            <button type="submit" className="button">Entrer</button>
          </form>
        </div>
      </div>
    );
  }

  const members = listMembers();
  const logins = listLogins(200);
  const s = stats();

  return (
    <div className="container admin">
      <div className="admin__head">
        <div>
          <h1 className="page-title">Administration</h1>
          <p className="admin__sub">Fiches des membres (identité Google, inscription, téléphone) et historique des connexions.</p>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" className="button button--ghost">Quitter l'admin</button>
        </form>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="stat__value">{s.members}</span>
          <span className="stat__label">membres connectés via Google</span>
        </div>
        <div className="stat">
          <span className="stat__value">{s.registered}</span>
          <span className="stat__label">inscriptions complètes</span>
        </div>
        <div className="stat">
          <span className="stat__value">{s.loginsToday}</span>
          <span className="stat__label">connexions aujourd'hui</span>
        </div>
        <div className="stat">
          <span className="stat__value">{s.logins}</span>
          <span className="stat__label">connexions au total</span>
        </div>
      </div>

      <section className="section">
        <h2 className="section-title">Membres ({members.length})</h2>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>E-mail</th>
                <th>Téléphone</th>
                <th>Inscription</th>
                <th>Langue</th>
                <th>Première connexion</th>
                <th>Dernière connexion</th>
                <th>Dernière IP</th>
                <th>Appareil</th>
                <th>Connexions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    {m.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.image} alt="" className="avatar avatar--lg" width={32} height={32} referrerPolicy="no-referrer" />
                    ) : (
                      <span className="avatar avatar--lg avatar--placeholder">{(m.name || m.email)[0]}</span>
                    )}
                  </td>
                  <td>{m.given_name || "—"}</td>
                  <td>{m.family_name || "—"}</td>
                  <td>
                    <a href={`mailto:${m.email}`}>{m.email}</a>
                    {m.email_verified ? <span className="badge badge--ok" title="Adresse vérifiée par Google">vérifié</span> : null}
                  </td>
                  <td>{m.phone ? <a href={`tel:${m.phone}`}>{m.phone}</a> : "—"}</td>
                  <td>
                    {m.registered ? (
                      <span className="badge badge--ok" title={m.registered_at ? fmt(m.registered_at) : ""}>complète</span>
                    ) : (
                      <span className="badge badge--warn">incomplète</span>
                    )}
                  </td>
                  <td>{m.locale || "—"}</td>
                  <td>{fmt(m.first_login)}</td>
                  <td>{fmt(m.last_login)}</td>
                  <td>{m.last_ip || "—"}</td>
                  <td title={m.last_user_agent}>{shortUA(m.last_user_agent)}</td>
                  <td className="num">{m.login_count}</td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr><td colSpan={12} className="empty">Aucun membre pour le moment.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Historique des connexions (200 dernières)</h2>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Membre</th>
                <th>E-mail</th>
                <th>Adresse IP</th>
                <th>Appareil</th>
              </tr>
            </thead>
            <tbody>
              {logins.map((l) => (
                <tr key={l.id}>
                  <td>{fmt(l.at)}</td>
                  <td>{l.name || "—"}</td>
                  <td>{l.email}</td>
                  <td>{l.ip || "—"}</td>
                  <td title={l.user_agent}>{shortUA(l.user_agent)}</td>
                </tr>
              ))}
              {logins.length === 0 && (
                <tr><td colSpan={5} className="empty">Aucune connexion enregistrée.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
