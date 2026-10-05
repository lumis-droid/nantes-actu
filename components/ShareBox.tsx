"use client";

import { useState } from "react";

export function ShareBox({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible : le champ reste sélectionnable */
    }
  }
  return (
    <div className="share">
      <span className="share__label">Partager cet article</span>
      <div className="share__row">
        <input className="share__input" readOnly value={url} onFocus={(e) => e.currentTarget.select()} />
        <button type="button" className="button" onClick={copy}>
          {copied ? "Lien copié !" : "Copier le lien"}
        </button>
      </div>
    </div>
  );
}
