import { WorkoutCatalogItem } from "@/lib/types";

export const WORKOUT_CATALOG: WorkoutCatalogItem[] = [
  // --- Warm Up ---
  {
    id: "neck-shoulder-rolls",
    name: "Neck & Shoulder Rolls",
    description: "Slow, gentle rolls to loosen up the neck and shoulders before anything else.",
    category: "warmup",
    estimatedMinutes: [1, 2],
  },
  {
    id: "arm-circles",
    name: "Arm Circles",
    description: "Big, slow circles forward and backward to warm up the shoulders and arms.",
    category: "warmup",
    estimatedMinutes: [1, 2],
  },
  {
    id: "leg-swings",
    name: "Leg Swings (Front & Side)",
    description: "Controlled swings holding onto something steady, to open up the hips.",
    category: "warmup",
    estimatedMinutes: [2, 3],
  },
  {
    id: "ankle-circles",
    name: "Ankle Circles",
    description: "Circle each ankle both directions — important for pointed feet and jumps.",
    category: "warmup",
    estimatedMinutes: [1, 2],
  },
  {
    id: "light-jogging-in-place",
    name: "Light Jogging in Place",
    description: "A few minutes of easy jogging to get the heart rate up before stretching.",
    category: "warmup",
    estimatedMinutes: [3, 5],
  },
  {
    id: "jumping-jacks",
    name: "Jumping Jacks",
    description: "A quick cardio burst to finish warming up the whole body.",
    category: "warmup",
    estimatedMinutes: [2, 3],
  },

  // --- Flexibility ---
  // Leg Flexibility Exercises
  {
    id: "front-split",
    name: "Front Split (Right / Left Split)",
    description: "One leg goes forward, the other back, working toward a straight 180° line. Used for leaps, kicks, and balances.",
    category: "flexibility",
    subgroup: "Leg Flexibility Exercises",
    estimatedMinutes: [3, 4],
  },
  {
    id: "middle-split",
    name: "Middle Split (Straddle Split)",
    description: "Both legs open sideways. Used for split jumps and flexibility skills.",
    category: "flexibility",
    subgroup: "Leg Flexibility Exercises",
    estimatedMinutes: [3, 4],
  },
  {
    id: "pancake-stretch",
    name: "Pancake Stretch",
    description: "Sit with legs wide open and fold your chest forward toward the floor. Improves hip and hamstring flexibility.",
    category: "flexibility",
    subgroup: "Leg Flexibility Exercises",
    estimatedMinutes: [2, 3],
  },

  // Back & Shoulder Flexibility
  {
    id: "bridge-backbend",
    name: "Bridge / Backbend",
    description: "Hands and feet on the floor, body forms an arch. Builds back, shoulder, and chest flexibility.",
    category: "flexibility",
    subgroup: "Back & Shoulder Flexibility",
    estimatedMinutes: [2, 3],
  },
  {
    id: "camel-stretch",
    name: "Camel Stretch",
    description: "Kneeling position, leaning backward while opening the chest. Helps with back flexibility and posture.",
    category: "flexibility",
    subgroup: "Back & Shoulder Flexibility",
    estimatedMinutes: [2, 3],
  },
  {
    id: "shoulder-stretch",
    name: "Shoulder Stretch",
    description: "Opens shoulders and improves arm positions for ribbon, hoop, and dance movements.",
    category: "flexibility",
    subgroup: "Back & Shoulder Flexibility",
    estimatedMinutes: [2, 3],
  },

  // Rhythmic Gymnastics Flexibility Positions
  {
    id: "arabesque",
    name: "Arabesque",
    description: "Standing on one leg with the other leg extended behind. A basic rhythmic gymnastics balance position.",
    category: "flexibility",
    subgroup: "Rhythmic Gymnastics Flexibility Positions",
    estimatedMinutes: [2, 3],
  },
  {
    id: "needle-scale",
    name: "Needle Scale",
    description: "A very high leg lift behind the body. Requires advanced back and leg flexibility.",
    category: "flexibility",
    subgroup: "Rhythmic Gymnastics Flexibility Positions",
    estimatedMinutes: [3, 4],
  },
  {
    id: "attitude",
    name: "Attitude",
    description: "Similar to arabesque, but the lifted leg is bent. Common in ballet and rhythmic gymnastics.",
    category: "flexibility",
    subgroup: "Rhythmic Gymnastics Flexibility Positions",
    estimatedMinutes: [2, 3],
  },

  // Advanced Flexibility Skills
  {
    id: "ring-position",
    name: "Ring Position",
    description: "Back leg bends upward toward the head, creating a \"ring\" shape. Used in advanced rhythmic gymnastics.",
    category: "flexibility",
    subgroup: "Advanced Flexibility Skills",
    estimatedMinutes: [3, 4],
  },
  {
    id: "scorpion",
    name: "Scorpion",
    description: "Similar to ring position, with the foot reaching toward the head. Requires significant back flexibility.",
    category: "flexibility",
    subgroup: "Advanced Flexibility Skills",
    estimatedMinutes: [3, 4],
  },
  {
    id: "penche",
    name: "Penché",
    description: "A high arabesque where the torso leans forward while the leg lifts high.",
    category: "flexibility",
    subgroup: "Advanced Flexibility Skills",
    estimatedMinutes: [3, 4],
  },

  // --- Strength ---
  {
    id: "plank-hold",
    name: "Plank Hold",
    description: "Hold a straight-body plank to build core stability.",
    category: "strength",
    estimatedMinutes: [1, 2],
  },
  {
    id: "situps-core",
    name: "Sit-Ups / Core Work",
    description: "A short set of sit-ups or crunches to build core strength.",
    category: "strength",
    estimatedMinutes: [3, 4],
  },
  {
    id: "leg-lifts",
    name: "Leg Lifts",
    description: "Lying or standing leg lifts to build the strength needed for high leaps.",
    category: "strength",
    estimatedMinutes: [2, 3],
  },
  {
    id: "releve-calf-raises",
    name: "Relevé Calf Raises",
    description: "Rise up onto the balls of the feet to build ankle and calf strength for balances.",
    category: "strength",
    estimatedMinutes: [2, 3],
  },
  {
    id: "superman-back-extension",
    name: "Superman Back Extension",
    description: "Lying face-down, lift arms and legs together to build back strength.",
    category: "strength",
    estimatedMinutes: [2, 3],
  },
  {
    id: "squats",
    name: "Bodyweight Squats",
    description: "A short set of squats to build leg power for jumps.",
    category: "strength",
    estimatedMinutes: [2, 3],
  },

  // --- Skill Practice ---
  {
    id: "balance-practice",
    name: "Balance Practice",
    description: "Hold a passé or arabesque balance on each leg, working on stillness.",
    category: "skills",
    estimatedMinutes: [3, 4],
  },
  {
    id: "jump-practice",
    name: "Jump Practice",
    description: "Repeat straight jumps and tuck jumps, focusing on pointed toes and a soft landing.",
    category: "skills",
    estimatedMinutes: [3, 4],
  },
  {
    id: "pivot-practice",
    name: "Pivot Practice",
    description: "Practice single passé turns, focusing on a tall, spotted turn.",
    category: "skills",
    estimatedMinutes: [3, 4],
  },
  {
    id: "apparatus-play",
    name: "Free Apparatus Play",
    description: "Open practice time with your favorite apparatus — rope, hoop, ball, clubs, or ribbon.",
    category: "skills",
    estimatedMinutes: [3, 5],
  },
];
