import { EquipmentCatalogItem } from "@/lib/types";

const BRAND_GUIDANCE =
  "Well-known brands include Pastorelli, Chacott, Sasaki, and Amaya. For competitions, make sure the piece has an FIG-approved certification label. For practice at home or in early classes, cheaper training-grade gear from the same brands (or a local gymnastics shop) is completely fine — save the certified competition piece for later.";

export const EQUIPMENT_CATALOG: EquipmentCatalogItem[] = [
  // --- Attire ---
  {
    id: "leotard",
    category: "attire",
    name: "Leotard",
    emoji: "🩱",
    description: "The snug, stretchy outfit worn for practice.",
    material: "Nylon/spandex or polyester/spandex blend.",
    funFact: "A simple everyday leotard is all you need — sparkly ones can wait!",
    guidanceByLevel: {
      entry: `Use the brand's height/age size chart rather than guessing — RG leotards run snug on purpose. ${BRAND_GUIDANCE}`,
    },
  },
  {
    id: "shoes",
    category: "attire",
    name: "Half Shoes / Foot Undies",
    emoji: "🩰",
    description: "Small pads that protect the foot while turning.",
    material: "Suede, leather, or elastic fabric with a suede sole patch.",
    funFact: "They only cover part of the foot, so pointed-foot flexibility isn't blocked.",
    guidanceByLevel: {
      entry: `Size these to fit snugly like a sock, not like a regular shoe. ${BRAND_GUIDANCE}`,
    },
  },

  // --- Hand Apparatus ---
  {
    id: "rope",
    category: "apparatus",
    apparatusType: "rope",
    name: "Rope",
    emoji: "🪢",
    description: "Used for jumps, swings, and building rhythm.",
    material: "Hemp, cotton, or synthetic fiber.",
    funFact: "Ropes aren't sold pre-cut — gymnasts trim them to their own height!",
    guidanceByLevel: {
      entry: `Rope isn't sized by a chart — it's sized to the gymnast. ${BRAND_GUIDANCE} A soft cotton/poly rope is a good, inexpensive first rope.`,
    },
  },
  {
    id: "hoop",
    category: "apparatus",
    apparatusType: "hoop",
    name: "Hoop",
    emoji: "⭕",
    description: "A ring apparatus for swings, rolls, and rotations.",
    material: "Wood or plastic (PVC training hoops are lighter for kids).",
    funFact: "Light beginner hoops can flex a little — that's normal.",
    guidanceByLevel: { entry: BRAND_GUIDANCE },
  },
  {
    id: "ball",
    category: "apparatus",
    apparatusType: "ball",
    name: "Ball",
    emoji: "🔴",
    description: "A soft ball for bounces, rolls, and catches.",
    material: "Rubber or synthetic gel material.",
    funFact: "In competition the ball should rest on the palm, never be gripped.",
    guidanceByLevel: {
      entry: `Younger or smaller beginners often start with a lighter, slightly smaller training ball. ${BRAND_GUIDANCE}`,
    },
  },
  {
    id: "clubs",
    category: "apparatus",
    apparatusType: "clubs",
    name: "Clubs",
    emoji: "🎳",
    description: "A pair used for mills, swings, and throws.",
    material: "Wood or synthetic material.",
    funFact: "Clubs are tricky at first because each hand often moves differently.",
    guidanceByLevel: {
      entry: `Look for a lightweight beginner pair first — heavier clubs are harder to control while learning. ${BRAND_GUIDANCE}`,
    },
  },
  {
    id: "ribbon",
    category: "apparatus",
    apparatusType: "ribbon",
    name: "Ribbon",
    emoji: "🎗️",
    description: "A fabric ribbon on a stick for spirals and circles.",
    material: "Satin or synthetic fabric on a wood or synthetic stick.",
    funFact: "A tangled ribbon mid-routine is the most common beginner mistake.",
    guidanceByLevel: {
      entry: `Beginners often start with a shorter, narrower practice ribbon (roughly 4-5m). ${BRAND_GUIDANCE}`,
    },
  },

  // --- Exercise Equipment ---
  // No FIG competition rules govern training aids, so these use the same
  // guidance at every level (no "entry vs competition" split applies).
  {
    id: "yoga-block",
    category: "exercise",
    name: "Yoga Block",
    emoji: "🧱",
    description: "Helps support and deepen stretches.",
    material: "EVA foam or cork.",
    funFact: "Even elite gymnasts use blocks to safely build flexibility.",
    guidanceByLevel: {
      entry: "Any standard yoga block works well — foam is lighter and cheaper, cork is firmer and more durable.",
      competition: "Any standard yoga block works well — foam is lighter and cheaper, cork is firmer and more durable.",
    },
  },
  {
    id: "foam-roller",
    category: "exercise",
    name: "Foam Roller",
    emoji: "🪵",
    description: "Used to relax and loosen tight muscles.",
    material: "Dense EVA foam.",
    funFact: "A few minutes of rolling before stretching can make splits feel easier.",
    guidanceByLevel: {
      entry: "A medium-density roller (not too firm) is most comfortable for young beginners just starting out.",
      competition: "A medium-density roller (not too firm) is most comfortable for young beginners just starting out.",
    },
  },
  {
    id: "resistance-bands",
    category: "exercise",
    name: "Resistance Bands",
    emoji: "➰",
    description: "Loop bands for extra strength conditioning.",
    material: "Natural or synthetic rubber.",
    funFact: "Great for warming up shoulders before ribbon or clubs work.",
    guidanceByLevel: {
      entry: "Look for a light-resistance loop band to start — inexpensive and available at any sporting goods store.",
      competition: "Look for a light-resistance loop band to start — inexpensive and available at any sporting goods store.",
    },
  },
  {
    id: "stretch-band",
    category: "exercise",
    name: "Stretch Band",
    emoji: "🧵",
    description: "A long strap that assists deep split stretches.",
    material: "Woven cotton or nylon webbing.",
    funFact: "Many coaches build these straps into their gymnasts' daily stretch routine.",
    guidanceByLevel: {
      entry: "A simple stretching strap with loops along its length makes split and flexibility work much easier.",
      competition: "A simple stretching strap with loops along its length makes split and flexibility work much easier.",
    },
  },

  // --- Other ---
  {
    id: "gym-bag",
    category: "other",
    name: "Gym Bag",
    emoji: "🎒",
    description: "A roomy bag for carrying all your gear.",
    material: "Durable nylon or canvas.",
    guidanceByLevel: {
      entry: "Pick a bag big enough to fit a hoop flat (roughly 90cm across) plus your other gear.",
      competition: "Pick a bag big enough to fit a hoop flat (roughly 90cm across) plus your other gear.",
    },
  },
];
