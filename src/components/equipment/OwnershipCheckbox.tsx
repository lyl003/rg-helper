interface OwnershipCheckboxProps {
  owned: boolean;
  onToggle: (owned: boolean) => void;
}

export default function OwnershipCheckbox({ owned, onToggle }: OwnershipCheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-full bg-brand-pink/5 px-3 py-2 text-sm font-semibold">
      <input
        type="checkbox"
        checked={owned}
        onChange={(e) => onToggle(e.target.checked)}
        className="h-4 w-4 accent-brand-pink"
      />
      {owned ? "✅ Already purchased" : "Already purchased?"}
    </label>
  );
}
