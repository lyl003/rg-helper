import { ApparatusType, Profile } from "@/lib/types";
import {
  BALL_SIZE,
  CLUBS_SIZE,
  RIBBON_SIZE,
  getHoopSizeRecommendation,
  getRopeSizingGuidance,
} from "@/lib/sizing";

interface SizingBoxProps {
  apparatusType: ApparatusType;
  profile: Profile | null;
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-foreground/60">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

export default function SizingBox({ apparatusType, profile }: SizingBoxProps) {
  if (apparatusType === "hoop") {
    const result = getHoopSizeRecommendation(profile);
    return (
      <div className="space-y-1.5 rounded-xl bg-brand-teal/5 p-3">
        <Fact
          label={result.basis === "senior-default" ? "Senior size" : "Recommended size"}
          value={`${result.rangeCm[0]}${result.rangeCm[1] !== result.rangeCm[0] ? `-${result.rangeCm[1]}` : ""}cm`}
        />
        <p className="text-xs text-foreground/60">{result.note}</p>
      </div>
    );
  }

  if (apparatusType === "ball") {
    return (
      <div className="space-y-1.5 rounded-xl bg-brand-teal/5 p-3">
        <Fact label="Diameter" value={`${BALL_SIZE.diameterCm[0]}-${BALL_SIZE.diameterCm[1]}cm`} />
        <Fact label="Min. weight" value={`${BALL_SIZE.minWeightG}g`} />
        <p className="text-xs text-foreground/60">{BALL_SIZE.note}</p>
      </div>
    );
  }

  if (apparatusType === "clubs") {
    return (
      <div className="space-y-1.5 rounded-xl bg-brand-teal/5 p-3">
        <Fact label="Length" value={`${CLUBS_SIZE.lengthCm[0]}-${CLUBS_SIZE.lengthCm[1]}cm`} />
        <Fact label="Min. weight (each)" value={`${CLUBS_SIZE.minWeightEachG}g`} />
        <Fact label="Max head diameter" value={`${CLUBS_SIZE.maxHeadDiameterMm}mm`} />
      </div>
    );
  }

  if (apparatusType === "ribbon") {
    return (
      <div className="space-y-1.5 rounded-xl bg-brand-teal/5 p-3">
        <Fact label="Stick length" value={`${RIBBON_SIZE.stickLengthCm[0]}-${RIBBON_SIZE.stickLengthCm[1]}cm`} />
        <Fact label="Fabric width" value={`${RIBBON_SIZE.fabricWidthCm[0]}-${RIBBON_SIZE.fabricWidthCm[1]}cm`} />
        <Fact label="Min. length" value={`${RIBBON_SIZE.minLengthM}m`} />
        <Fact label="Max weight" value={`${RIBBON_SIZE.maxWeightG}g`} />
        <p className="text-xs text-foreground/60">{RIBBON_SIZE.juniorNote}</p>
      </div>
    );
  }

  // rope
  const guidance = getRopeSizingGuidance();
  return (
    <div className="space-y-1.5 rounded-xl bg-brand-teal/5 p-3">
      <p className="text-sm font-semibold">How to size it</p>
      <p className="text-xs text-foreground/70">{guidance.method}</p>
      <p className="text-xs text-foreground/60">{guidance.beginnerNote}</p>
      <p className="text-xs text-foreground/60">{guidance.advancedNote}</p>
    </div>
  );
}
