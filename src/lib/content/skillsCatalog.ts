import { SkillCatalogItem } from "@/lib/types";

export const SKILLS_CATALOG: SkillCatalogItem[] = [
  // Flexibility
  { id: "front-split-right", category: "flexibility", name: "Front Split (Right)", description: "Flat front split leading with the right leg." },
  { id: "front-split-left", category: "flexibility", name: "Front Split (Left)", description: "Flat front split leading with the left leg." },
  { id: "straddle-split", category: "flexibility", name: "Side / Straddle Split", description: "Flat side split with both legs extended straight out." },
  { id: "needle-scale", category: "flexibility", name: "Needle Scale", description: "Standing leg lift with the working leg reaching straight up past vertical." },
  { id: "full-bridge", category: "flexibility", name: "Full Bridge", description: "A complete, unsupported backbend bridge from standing or lying down." },
  { id: "bridge-kickover-prep", category: "flexibility", name: "Bridge Kickover Prep", description: "The lead-up drills for kicking over from a bridge." },
  { id: "chest-stand", category: "flexibility", name: "Chest Stand", description: "A backbend shape balancing on the chest with legs overhead." },
  { id: "shoulder-ring", category: "flexibility", name: "Shoulder Flexibility (Ring Position)", description: "Overhead shoulder flexibility used in ring-shaped balances and leaps." },

  // Leaps / Jumps
  { id: "straight-jump", category: "leaps", name: "Straight Jump", description: "A basic vertical jump with legs together and pointed toes." },
  { id: "tuck-jump", category: "leaps", name: "Tuck Jump", description: "A jump bringing both knees up toward the chest." },
  { id: "split-leap", category: "leaps", name: "Split Leap", description: "A traveling leap that opens into a full front split in the air." },
  { id: "stag-leap", category: "leaps", name: "Stag Leap", description: "A leap with the front leg bent and the back leg extended straight." },
  { id: "scissor-leap", category: "leaps", name: "Scissor Leap", description: "A quick switch leap where the legs change position mid-air." },

  // Balances
  { id: "passe-balance", category: "balances", name: "Passé (Retiré) Balance", description: "Balancing on one leg with the other foot resting at the knee." },
  { id: "arabesque-balance", category: "balances", name: "Arabesque Balance", description: "Balancing on one leg with the other extended straight behind." },
  { id: "attitude-balance", category: "balances", name: "Attitude Balance", description: "Balancing on one leg with the other lifted and bent behind or in front." },
  { id: "needle-y-balance", category: "balances", name: "Needle / Y-Balance", description: "Balancing on one leg with the working leg lifted straight up beside the head." },

  // Pivots / Turns
  { id: "single-passe-turn", category: "pivots", name: "Single Passé Turn", description: "A single rotation on one foot with the other foot at the knee." },
  { id: "chaine-turns", category: "pivots", name: "Chaîné Turns", description: "A quick series of turns traveling in a line." },
  { id: "fouette-turn-intro", category: "pivots", name: "Fouetté Turn (Intro)", description: "Introductory drills for the whipping fouetté turn." },
  { id: "double-passe-turn", category: "pivots", name: "Double Passé Turn (Stretch Goal)", description: "Two full rotations in passé position — a stretch goal for confident beginners." },

  // Rope
  { id: "rope-two-foot-jump", category: "apparatus-rope", name: "Two-Foot Jump Through Rope", description: "Basic jump through the turning rope with both feet together." },
  { id: "rope-skip-steps", category: "apparatus-rope", name: "Skip Steps with Rope", description: "Alternating-foot skipping while turning the rope." },
  { id: "rope-swing-circle", category: "apparatus-rope", name: "Rope Swing (Circle)", description: "Large circular swings of the rope to each side." },
  { id: "rope-leap-through", category: "apparatus-rope", name: "Leap Through Rope", description: "A leap combined with a jump through the turning rope." },

  // Hoop
  { id: "hoop-swing", category: "apparatus-hoop", name: "Hoop Swing", description: "Swinging the hoop smoothly from the wrist." },
  { id: "hoop-ground-spin", category: "apparatus-hoop", name: "Hoop Rotation (Ground Spin)", description: "Spinning the hoop flat on the ground like a top." },
  { id: "hoop-body-roll", category: "apparatus-hoop", name: "Hoop Body Roll", description: "Rolling the hoop along an arm or across the chest." },
  { id: "hoop-pass-through", category: "apparatus-hoop", name: "Pass Through Hoop", description: "Stepping or jumping through the hoop while it's held or rolling." },
  { id: "hoop-toss-catch", category: "apparatus-hoop", name: "Hoop Toss & Catch", description: "A basic vertical toss and clean catch of the hoop." },

  // Ball
  { id: "ball-bounce", category: "apparatus-ball", name: "Ball Bounce", description: "Bouncing the ball off the floor and catching it softly." },
  { id: "ball-body-roll", category: "apparatus-ball", name: "Ball Body Roll", description: "Rolling the ball along the arms, chest, or back." },
  { id: "ball-toss-catch", category: "apparatus-ball", name: "Ball Toss & Catch", description: "A basic toss and soft, silent catch on the palm." },
  { id: "ball-figure-8", category: "apparatus-ball", name: "Ball Figure-8", description: "Weaving the ball through a smooth figure-8 pattern with the hands." },

  // Clubs
  { id: "clubs-mill", category: "apparatus-clubs", name: "Clubs Mill (Small Circles)", description: "Small alternating circles of the clubs at the wrist." },
  { id: "clubs-swing", category: "apparatus-clubs", name: "Clubs Swing", description: "Larger swinging circles of both clubs together." },
  { id: "clubs-single-toss", category: "apparatus-clubs", name: "Single Club Toss & Catch", description: "Tossing and catching one club while holding the other steady." },
  { id: "clubs-asymmetric-throw", category: "apparatus-clubs", name: "Basic Asymmetric Club Throw", description: "A simple throw where the two clubs move differently at the same time." },

  // Ribbon
  { id: "ribbon-small-snake", category: "apparatus-ribbon", name: "Small Ribbon Snake", description: "Small wavy snake patterns made with quick wrist movements." },
  { id: "ribbon-spiral", category: "apparatus-ribbon", name: "Ribbon Spiral", description: "Circular spiral patterns traced in the air with the ribbon." },
  { id: "ribbon-circle", category: "apparatus-ribbon", name: "Ribbon Circle", description: "Large, smooth circles keeping the ribbon fully extended." },
  { id: "ribbon-throw-catch", category: "apparatus-ribbon", name: "Ribbon Throw & Catch", description: "A basic throw of the stick and catch without tangling the fabric." },
];
