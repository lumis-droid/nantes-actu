/**
 * Illustration abstraite déterministe (à partir du slug) qui remplace
 * les photos d'actualité : formes géométriques dans les tons orange.
 */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function ArtVisual({ seed, className = "" }: { seed: string; className?: string }) {
  const h = hash(seed);
  const r = (n: number, max: number) => ((h >>> (n * 4)) % 1000) / 1000 * max;
  const variant = h % 4;
  const tones = ["#F26419", "#FF8C42", "#C44D0B", "#FFD2B3", "#1A1A1A"];

  return (
    <svg
      viewBox="0 0 400 240"
      className={`visual ${className}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="400" height="240" fill="#FFF1E8" />
      {variant === 0 && (
        <>
          <circle cx={120 + r(1, 160)} cy={100 + r(2, 60)} r={90 + r(3, 40)} fill={tones[0]} />
          <rect x={200 + r(4, 120)} y={-20} width="140" height="300" fill={tones[4]} opacity="0.9" transform={`rotate(${15 + r(5, 20)} 300 120)`} />
          <circle cx={60 + r(6, 60)} cy={190} r="34" fill={tones[1]} />
        </>
      )}
      {variant === 1 && (
        <>
          <path d={`M0 ${140 + r(1, 60)} C 100 ${60 + r(2, 60)}, 200 ${220 - r(3, 60)}, 400 ${120 + r(4, 40)} V240 H0 Z`} fill={tones[0]} />
          <path d={`M0 ${190 + r(5, 30)} C 120 ${150}, 260 ${230}, 400 ${180} V240 H0 Z`} fill={tones[2]} />
          <circle cx={300 + r(6, 60)} cy={60 + r(7, 30)} r="38" fill={tones[4]} />
        </>
      )}
      {variant === 2 && (
        <>
          <rect x="0" y="0" width={160 + r(1, 120)} height="240" fill={tones[0]} />
          <rect x={120 + r(2, 100)} y={40 + r(3, 80)} width="150" height="150" fill={tones[4]} transform={`rotate(${r(4, 30)} 200 120)`} />
          <circle cx={340} cy={60 + r(5, 100)} r="48" fill={tones[1]} />
        </>
      )}
      {variant === 3 && (
        <>
          <polygon points={`0,240 ${140 + r(1, 100)},0 ${260 + r(2, 120)},240`} fill={tones[0]} />
          <polygon points={`220,240 ${300 + r(3, 60)},${40 + r(4, 80)} 400,240`} fill={tones[4]} />
          <circle cx={70 + r(5, 40)} cy={70 + r(6, 40)} r="30" fill={tones[2]} />
        </>
      )}
    </svg>
  );
}
