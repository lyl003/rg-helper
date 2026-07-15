interface ResetSessionButtonProps {
  onReset: () => void;
}

export default function ResetSessionButton({ onReset }: ResetSessionButtonProps) {
  return (
    <button
      onClick={onReset}
      className="rounded-full px-4 py-1.5 text-sm font-semibold text-foreground/60 hover:bg-brand-purple/10"
    >
      Start a new session ↺
    </button>
  );
}
