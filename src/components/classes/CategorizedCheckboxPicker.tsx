interface CategorizedItem {
  id: string;
  name: string;
  category: string;
}

interface CategorizedCheckboxPickerProps<T extends CategorizedItem> {
  items: T[];
  categoryLabels: Record<string, string>;
  categoryOrder: string[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

export default function CategorizedCheckboxPicker<T extends CategorizedItem>({
  items,
  categoryLabels,
  categoryOrder,
  selectedIds,
  onToggle,
}: CategorizedCheckboxPickerProps<T>) {
  return (
    <>
      {categoryOrder.map((category) => {
        const categoryItems = items.filter((item) => item.category === category);
        if (categoryItems.length === 0) return null;
        return (
          <div key={category} className="mb-2 last:mb-0">
            <h4 className="mb-1 px-1 text-xs font-bold uppercase tracking-wide text-foreground/40">
              {categoryLabels[category]}
            </h4>
            <div className="space-y-0.5">
              {categoryItems.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-1 text-sm hover:bg-white/50"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => onToggle(item.id)}
                    className="h-4 w-4 accent-brand-purple"
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
