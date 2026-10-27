import React from 'react';

// Animated cartoon couple for the opening card: groom in naval whites, bride in a white gown.
const SKIN_GROOM = '#b07a55';
const SKIN_BRIDE = '#bb8460';
const HAIR = '#2a1a14';
const LINE = '#eadfe4';
const GOLD = '#d4af37';
const NAVY = '#1f2937';

const Heart: React.FC<{ x: number; y: number; delay: string; size?: number }> = ({ x, y, delay, size = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${size})`}>
    <path
      className="art-heart"
      style={{ animationDelay: delay }}
      d="M0 3C0 0 4 0 4 3C4 0 8 0 8 3C8 6 4 8 4 10C4 8 0 6 0 3Z"
      fill="#e3a7b5"
    />
  </g>
);

export const CoupleArt: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 240" className={className} role="img" aria-label="Cartoon of the bride and groom">
    {/* Ground shadow */}
    <ellipse cx="102" cy="226" rx="66" ry="6" fill="#f9e3e8" />

    <g className="art-sway">
      {/* ---------- Groom ---------- */}
      {/* Legs and shoes */}
      <rect x="65" y="158" width="11" height="64" rx="4" fill="#fff" stroke={LINE} />
      <rect x="80" y="158" width="11" height="64" rx="4" fill="#fff" stroke={LINE} />
      <ellipse cx="70" cy="223" rx="9" ry="4" fill="#2b2b2b" />
      <ellipse cx="86" cy="223" rx="9" ry="4" fill="#2b2b2b" />

      {/* Arms (back arm, then the one reaching to the bride) */}
      <rect x="50" y="104" width="10" height="48" rx="5" fill="#fff" stroke={LINE} />
      <circle cx="55" cy="154" r="5" fill={SKIN_GROOM} />
      <rect x="94" y="104" width="10" height="44" rx="5" fill="#fff" stroke={LINE} transform="rotate(-20 99 104)" />

      {/* Jacket */}
      <path d="M57 100 Q78 92 99 100 L101 162 L55 162 Z" fill="#fff" stroke={LINE} />
      <path d="M72 100 L78 113 L84 100" fill="none" stroke={LINE} strokeWidth="1.5" />
      <line x1="78" y1="113" x2="78" y2="150" stroke={LINE} />
      <circle cx="78" cy="122" r="1.2" fill={LINE} />
      <circle cx="78" cy="134" r="1.2" fill={LINE} />
      <rect x="62" y="117" width="10" height="3" rx="1" fill="#e9a66b" />
      <rect x="85" y="117" width="8" height="3" rx="1" fill="#6aa0c8" />
      {/* Epaulettes */}
      <rect x="57" y="99" width="13" height="5" rx="1.5" fill={NAVY} />
      <rect x="66" y="99" width="3" height="5" fill={GOLD} />
      <rect x="86" y="99" width="13" height="5" rx="1.5" fill={NAVY} />
      <rect x="87" y="99" width="3" height="5" fill={GOLD} />
      {/* Belt */}
      <rect x="56" y="148" width="44" height="5" fill="#f4f1f2" stroke={LINE} />
      <rect x="74" y="147" width="8" height="7" rx="1" fill="#cfd4da" />

      {/* Neck and head (tilted toward the bride) */}
      <g transform="rotate(7 78 92)">
        <rect x="73" y="86" width="10" height="14" rx="3" fill={SKIN_GROOM} />
        <circle cx="58.5" cy="74" r="4" fill={SKIN_GROOM} />
        <circle cx="97.5" cy="74" r="4" fill={SKIN_GROOM} />
        <circle cx="78" cy="72" r="20" fill={SKIN_GROOM} />
        <path d="M59 66 Q60 58 66 56 L64 68 Z M97 66 Q96 58 90 56 L92 68 Z" fill={HAIR} />
        {/* Beard and smile */}
        <path d="M60 76 Q62 97 78 98 Q94 97 96 76 Q92 89 78 90 Q64 89 60 76 Z" fill="#3b2a20" />
        <path d="M71 83 Q78 89 85 83 Q78 86 71 83 Z" fill="#fff" />
        <path d="M70 81 Q78 79 86 81" fill="none" stroke="#3b2a20" strokeWidth="2.2" strokeLinecap="round" />
        {/* Eyes */}
        <g className="art-blink">
          <circle cx="71" cy="72" r="2.3" fill="#2b1d16" />
          <circle cx="85" cy="72" r="2.3" fill="#2b1d16" />
        </g>
        <path d="M67 67 Q71 65 75 67 M81 67 Q85 65 89 67" stroke={HAIR} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* Naval cap */}
        <ellipse cx="78" cy="51" rx="26" ry="8" fill="#fff" stroke={LINE} />
        <rect x="58" y="51" width="40" height="9" rx="2" fill={NAVY} />
        <path d="M74 55 L78 51 L82 55 L78 59 Z" fill={GOLD} />
        <path d="M60 60 Q78 67 96 60 L96 62.5 Q78 70 60 62.5 Z" fill="#111" />
      </g>

      {/* ---------- Bride ---------- */}
      {/* Hair at the back */}
      <ellipse cx="125" cy="88" rx="23" ry="30" fill={HAIR} />
      <circle cx="105" cy="104" r="6" fill={HAIR} />
      <circle cx="145" cy="106" r="6" fill={HAIR} />

      {/* Veil */}
      <path className="art-veil" d="M130 56 Q164 72 166 152 Q150 142 142 104 Q138 80 130 64 Z" fill="#fff" opacity="0.8" stroke="#f1e6ea" />

      {/* Gown */}
      <path d="M110 110 Q124 104 138 110 L142 145 Q152 185 162 222 Q126 231 92 222 Q101 185 106 145 Z" fill="#fff" stroke={LINE} />
      <path d="M116 160 Q112 195 106 220 M126 160 L126 224 M136 160 Q141 195 148 220" stroke="#f3e9ed" strokeWidth="1.5" fill="none" />
      <path d="M106 142 Q124 148 142 142 L142 148 Q124 154 106 148 Z" fill="#f1cbd4" />

      {/* Neck and head (tilted toward the groom) */}
      <g transform="rotate(-7 124 98)">
        <rect x="119.5" y="92" width="9" height="16" rx="3" fill={SKIN_BRIDE} />
        <circle cx="124" cy="76" r="18" fill={SKIN_BRIDE} />
        <path d="M106 76 Q107 56 124 56 Q141 56 142 76 Q134 64 124 63 Q113 64 106 76 Z" fill={HAIR} />
        <path d="M112 60 L116 54 L120 59 L124 51 L128 59 L132 54 L136 60" stroke={GOLD} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        <circle cx="124" cy="51" r="1.8" fill="#f4a6b7" />
        <g className="art-blink">
          <circle cx="118" cy="77" r="2.1" fill="#2b1d16" />
          <circle cx="130" cy="77" r="2.1" fill="#2b1d16" />
        </g>
        <path d="M115 74 L114 72.5 M133 74 L134 72.5" stroke="#2b1d16" strokeWidth="1" strokeLinecap="round" />
        <circle cx="113.5" cy="84" r="3.5" fill="#f1a9b8" opacity="0.6" />
        <circle cx="134.5" cy="84" r="3.5" fill="#f1a9b8" opacity="0.6" />
        <path d="M119 86 Q124 90.5 129 86" stroke="#a24b5f" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="106.5" cy="80" r="1.5" fill={GOLD} />
      </g>

      {/* Bride's arms meeting at the bouquet, with the groom's hand */}
      <rect x="106" y="112" width="8" height="36" rx="4" fill={SKIN_BRIDE} transform="rotate(-10 110 112)" />
      <rect x="134" y="112" width="8" height="36" rx="4" fill={SKIN_BRIDE} transform="rotate(25 138 114)" />
      <circle cx="114" cy="146" r="5" fill={SKIN_GROOM} />

      {/* Bouquet */}
      <path d="M113 152 L120 170 L127 152 Z" fill="#9cc49a" />
      <circle cx="114" cy="148" r="5" fill="#f4a6b7" />
      <circle cx="124" cy="147" r="5" fill="#fff" stroke="#f1cbd4" />
      <circle cx="119" cy="142" r="5" fill="#e3a7b5" />
      <circle cx="119" cy="151" r="4.5" fill="#fff" stroke="#f1cbd4" />
      <circle cx="127" cy="152" r="3.5" fill="#f4a6b7" />
      <circle cx="111" cy="153" r="3" fill="#fff" stroke="#f1cbd4" />
    </g>

    {/* Floating hearts */}
    <Heart x={96} y={40} delay="0s" />
    <Heart x={104} y={44} delay="1.3s" size={0.7} />
    <Heart x={92} y={46} delay="2.6s" size={0.55} />
  </svg>
);
