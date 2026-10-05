import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

export type Member = {
  id: number;
  google_id: string;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  image: string;
  first_login: string;
  last_login: string;
  login_count: number;
};

export type LoginEvent = {
  id: number;
  member_id: number;
  email: string;
  name: string;
  at: string;
  ip: string;
  user_agent: string;
};

function open() {
  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  const db = new Database(path.join(dir, "nantes-actu.db"));
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      google_id TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT '',
      given_name TEXT NOT NULL DEFAULT '',
      family_name TEXT NOT NULL DEFAULT '',
      image TEXT NOT NULL DEFAULT '',
      first_login TEXT NOT NULL,
      last_login TEXT NOT NULL,
      login_count INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS logins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER NOT NULL REFERENCES members(id),
      at TEXT NOT NULL,
      ip TEXT NOT NULL DEFAULT '',
      user_agent TEXT NOT NULL DEFAULT ''
    );
    CREATE INDEX IF NOT EXISTS logins_at ON logins(at DESC);
  `);
  return db;
}

// Une seule connexion, ouverte au premier appel et conservée entre les
// rechargements à chaud en dev (et jamais ouverte pendant le build).
const globalForDb = globalThis as unknown as { __nantesActuDb?: Database.Database };
function getDb() {
  if (!globalForDb.__nantesActuDb) {
    const d = open();
    d.pragma("busy_timeout = 5000");
    globalForDb.__nantesActuDb = d;
  }
  return globalForDb.__nantesActuDb;
}

export function recordLogin(input: {
  googleId: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  image: string;
  ip: string;
  userAgent: string;
}) {
  const db = getDb();
  const now = new Date().toISOString();
  const tx = db.transaction(() => {
    db.prepare(
      `INSERT INTO members (google_id, email, name, given_name, family_name, image, first_login, last_login, login_count)
       VALUES (@googleId, @email, @name, @givenName, @familyName, @image, @now, @now, 1)
       ON CONFLICT(google_id) DO UPDATE SET
         email = excluded.email,
         name = excluded.name,
         given_name = excluded.given_name,
         family_name = excluded.family_name,
         image = excluded.image,
         last_login = excluded.last_login,
         login_count = members.login_count + 1`
    ).run({ ...input, now });
    const member = db
      .prepare("SELECT id FROM members WHERE google_id = ?")
      .get(input.googleId) as { id: number };
    db.prepare(
      "INSERT INTO logins (member_id, at, ip, user_agent) VALUES (?, ?, ?, ?)"
    ).run(member.id, now, input.ip, input.userAgent);
  });
  tx();
}

export function listMembers(): Member[] {
  return getDb().prepare("SELECT * FROM members ORDER BY last_login DESC").all() as Member[];
}

export function listLogins(limit = 200): LoginEvent[] {
  return getDb()
    .prepare(
      `SELECT l.id, l.member_id, l.at, l.ip, l.user_agent, m.email, m.name
       FROM logins l JOIN members m ON m.id = l.member_id
       ORDER BY l.at DESC LIMIT ?`
    )
    .all(limit) as LoginEvent[];
}

export function stats() {
  const db = getDb();
  const members = (db.prepare("SELECT COUNT(*) AS n FROM members").get() as { n: number }).n;
  const logins = (db.prepare("SELECT COUNT(*) AS n FROM logins").get() as { n: number }).n;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const loginsToday = (
    db.prepare("SELECT COUNT(*) AS n FROM logins WHERE at >= ?").get(today.toISOString()) as { n: number }
  ).n;
  return { members, logins, loginsToday };
}
