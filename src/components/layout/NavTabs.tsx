"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileAvatar from "@/components/layout/ProfileAvatar";

const TABS = [
  { href: "/", label: "Home", emoji: "🏠" },
  { href: "/exercises", label: "Workout", emoji: "🏃" },
  { href: "/skills", label: "Skills", emoji: "🌟" },
  { href: "/equipment", label: "Equipment", emoji: "🎀" },
] as const;

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-brand-purple/10 bg-background/90 backdrop-blur">
      <div className="max-w-4xl mx-auto px-2 sm:px-6">
        <div className="flex items-center justify-between gap-2 py-2">
          <div className="flex min-w-0 items-center gap-1 overflow-x-auto sm:gap-2">
            <Link
              href="/"
              className="mr-2 shrink-0 whitespace-nowrap text-lg font-extrabold text-brand-purple"
            >
              RG Helper ✨
            </Link>
            <nav className="flex gap-1 sm:gap-2">
              {TABS.map((tab) => {
                const active = pathname === tab.href;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition-colors sm:px-4 ${
                      active
                        ? "bg-brand-purple text-white shadow-sm"
                        : "text-foreground/70 hover:bg-brand-purple/10"
                    }`}
                  >
                    <span className="mr-1">{tab.emoji}</span>
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <ProfileAvatar />
        </div>
      </div>
    </header>
  );
}
