"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";

export default function ProfileAvatar() {
  const pathname = usePathname();
  const { profile } = useProfile();
  const active = pathname === "/account";
  const initial = profile?.name.trim().charAt(0).toUpperCase();

  return (
    <Link
      href="/account"
      aria-label={profile ? `${profile.name}'s profile` : "Set up your profile"}
      title={profile ? profile.name : "Me"}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
        active
          ? "border-brand-purple bg-brand-purple text-white"
          : "border-brand-purple/30 bg-brand-purple/10 text-brand-purple hover:border-brand-purple"
      }`}
    >
      {initial || (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.76-3.58-5-8-5Z" />
        </svg>
      )}
    </Link>
  );
}
