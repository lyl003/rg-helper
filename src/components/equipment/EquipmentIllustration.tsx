const COLORS: Record<string, { bg: string; fg: string }> = {
  leotard: { bg: "bg-brand-pink/10", fg: "#ec4899" },
  shoes: { bg: "bg-brand-purple/10", fg: "#8b5cf6" },
  rope: { bg: "bg-brand-teal/10", fg: "#14b8a6" },
  hoop: { bg: "bg-brand-purple/10", fg: "#8b5cf6" },
  ball: { bg: "bg-brand-pink/10", fg: "#ec4899" },
  clubs: { bg: "bg-brand-teal/10", fg: "#14b8a6" },
  ribbon: { bg: "bg-brand-pink/10", fg: "#ec4899" },
  "yoga-block": { bg: "bg-brand-purple/10", fg: "#8b5cf6" },
  "foam-roller": { bg: "bg-brand-teal/10", fg: "#14b8a6" },
  "resistance-bands": { bg: "bg-brand-pink/10", fg: "#ec4899" },
  "stretch-band": { bg: "bg-brand-purple/10", fg: "#8b5cf6" },
  "gym-bag": { bg: "bg-brand-teal/10", fg: "#14b8a6" },
};

function Shape({ itemId, color }: { itemId: string; color: string }) {
  switch (itemId) {
    case "rope":
      return (
        <path
          d="M8 44 Q20 14 32 44 T56 44 T80 44"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "hoop":
      return <circle cx="44" cy="44" r="28" stroke={color} strokeWidth="7" fill="none" />;
    case "ball":
      return <circle cx="44" cy="44" r="26" fill={color} fillOpacity="0.85" />;
    case "clubs":
      return (
        <g fill={color} fillOpacity="0.85">
          <path d="M28 16c-4 0-6 4-4 8l4 10v34a4 4 0 0 0 8 0V34l4-10c2-4 0-8-4-8Z" />
          <path d="M60 16c-4 0-6 4-4 8l4 10v34a4 4 0 0 0 8 0V34l4-10c2-4 0-8-4-8Z" />
        </g>
      );
    case "ribbon":
      return (
        <path
          d="M10 22 Q30 7 44 22 Q58 37 78 22 M10 44 Q30 29 44 44 Q58 59 78 44 M10 66 Q30 51 44 66 Q58 81 78 66"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      );
    case "leotard":
      return (
        <path
          d="M30 14h28l6 12-10 6v40a4 4 0 0 1-4 4H38a4 4 0 0 1-4-4V32l-10-6Z"
          fill={color}
          fillOpacity="0.85"
        />
      );
    case "shoes":
      return (
        <g fill={color} fillOpacity="0.85">
          <ellipse cx="28" cy="52" rx="14" ry="9" />
          <ellipse cx="60" cy="52" rx="14" ry="9" />
        </g>
      );
    case "yoga-block":
      return <rect x="18" y="26" width="52" height="36" rx="6" fill={color} fillOpacity="0.85" />;
    case "foam-roller":
      return (
        <g fill={color} fillOpacity="0.85">
          <rect x="16" y="32" width="56" height="24" rx="12" />
          <ellipse cx="16" cy="44" rx="6" ry="12" />
          <ellipse cx="72" cy="44" rx="6" ry="12" />
        </g>
      );
    case "resistance-bands":
      return <ellipse cx="44" cy="44" rx="26" ry="16" stroke={color} strokeWidth="6" fill="none" />;
    case "stretch-band":
      return (
        <g stroke={color} strokeWidth="9" strokeLinecap="round">
          <path d="M12 44h64" />
          <path d="M24 38v12" strokeWidth="4" />
          <path d="M44 38v12" strokeWidth="4" />
          <path d="M64 38v12" strokeWidth="4" />
        </g>
      );
    case "gym-bag":
      return (
        <g>
          <path d="M32 24a12 12 0 0 1 24 0" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
          <rect x="18" y="24" width="52" height="40" rx="8" fill={color} fillOpacity="0.85" />
        </g>
      );
    default:
      return <circle cx="44" cy="44" r="26" fill={color} fillOpacity="0.5" />;
  }
}

interface EquipmentIllustrationProps {
  itemId: string;
}

export default function EquipmentIllustration({ itemId }: EquipmentIllustrationProps) {
  const { bg, fg } = COLORS[itemId] ?? { bg: "bg-brand-purple/10", fg: "#8b5cf6" };
  return (
    <div className={`flex h-28 w-full items-center justify-center rounded-xl ${bg}`}>
      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
        <Shape itemId={itemId} color={fg} />
      </svg>
    </div>
  );
}
