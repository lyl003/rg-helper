import { Profile } from "@/lib/types";

export interface HoopSizeResult {
  rangeCm: [number, number];
  basis: "height" | "age" | "senior-default";
  note: string;
}

const HOOP_BY_HEIGHT: Array<{ maxHeightCm: number; rangeCm: [number, number] }> = [
  { maxHeightCm: 130, rangeCm: [60, 65] },
  { maxHeightCm: 140, rangeCm: [70, 70] },
  { maxHeightCm: 150, rangeCm: [75, 75] },
  { maxHeightCm: 160, rangeCm: [80, 80] },
  { maxHeightCm: 170, rangeCm: [85, 85] },
];

const HOOP_BY_AGE: Array<{ maxAge: number; rangeCm: [number, number] }> = [
  { maxAge: 4, rangeCm: [60, 60] },
  { maxAge: 6, rangeCm: [65, 65] },
  { maxAge: 8, rangeCm: [70, 70] },
  { maxAge: 10, rangeCm: [75, 75] },
  { maxAge: 12, rangeCm: [80, 80] },
];

const SENIOR_DEFAULT: HoopSizeResult = {
  rangeCm: [80, 90],
  basis: "senior-default",
  note: "FIG senior competition hoops are 80-90cm in diameter with a minimum weight of 300g. Fill out your profile on the Me tab for a size recommendation matched to height or age.",
};

export function getHoopSizeRecommendation(
  profile: Pick<Profile, "age" | "heightCm"> | null
): HoopSizeResult {
  if (!profile) return SENIOR_DEFAULT;

  if (profile.heightCm && profile.heightCm > 0) {
    const match = HOOP_BY_HEIGHT.find((row) => profile.heightCm <= row.maxHeightCm);
    if (match) {
      return {
        rangeCm: match.rangeCm,
        basis: "height",
        note: "Based on your height. The hoop should rest at about hip height and reach roughly to the belly button when stood on end.",
      };
    }
    return {
      rangeCm: [90, 90],
      basis: "height",
      note: "Based on your height, a full senior-size 90cm hoop is a good fit.",
    };
  }

  if (profile.age && profile.age > 0) {
    const match = HOOP_BY_AGE.find((row) => profile.age <= row.maxAge);
    if (match) {
      return {
        rangeCm: match.rangeCm,
        basis: "age",
        note: "Based on your age. Height is usually a more precise guide if you know it.",
      };
    }
    return {
      rangeCm: [85, 90],
      basis: "age",
      note: "Based on your age, a senior-size hoop (85-90cm) is a good fit.",
    };
  }

  return SENIOR_DEFAULT;
}

export const BALL_SIZE = {
  diameterCm: [18, 20] as [number, number],
  minWeightG: 400,
  note: "Smaller, lighter training balls exist for young beginners, though there's no official junior size chart — go with whatever feels comfortable to grip and toss.",
};

export const CLUBS_SIZE = {
  lengthCm: [40, 50] as [number, number],
  minWeightEachG: 150,
  maxHeadDiameterMm: 30,
};

export const RIBBON_SIZE = {
  stickLengthCm: [50, 60] as [number, number],
  maxStickDiameterCm: 1,
  fabricWidthCm: [4, 6] as [number, number],
  minLengthM: 6,
  maxWeightG: 35,
  juniorNote: "Juniors and beginners often start with a shorter practice ribbon, roughly 4-5m, before moving up to the full 6m+ competition length.",
};

export function getRopeSizingGuidance() {
  return {
    method:
      "Stand on the middle of the rope with your feet together. With the ends held up and knots tied, the rope should reach your armpits (or just slightly higher).",
    beginnerNote: "Beginners often start with a soft ~2.5m cotton or polyester rope.",
    advancedNote: "More experienced gymnasts typically use a ~3m nylon rope, trimmed to their own height.",
  };
}
