import { SkillCatalogItem } from "@/lib/types";

interface SkillItemRowProps {
  skill: SkillCatalogItem;
  learned: boolean;
  onToggle: (learned: boolean) => void;
}

export default function SkillItemRow({ skill, learned, onToggle }: SkillItemRowProps) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors ${
        learned ? "bg-brand-pink/10" : "bg-card"
      }`}
    >
      <input
        type="checkbox"
        checked={learned}
        onChange={(e) => onToggle(e.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 accent-brand-pink"
      />
      <div>
        <p className="font-semibold">
          {skill.name} {learned && <span className="text-brand-pink">✓ Learned</span>}
        </p>
        <p className="text-sm text-foreground/60">{skill.description}</p>
      </div>
    </label>
  );
}
