interface PageHeaderProps {
  emoji: string;
  title: string;
  subtitle: string;
}

export default function PageHeader({ emoji, title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="flex items-center gap-2 text-2xl font-extrabold sm:text-3xl">
        <span>{emoji}</span>
        {title}
      </h1>
      <p className="mt-1 text-foreground/70">{subtitle}</p>
    </div>
  );
}
