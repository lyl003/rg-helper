"use client";

import Link from "next/link";
import { useProfile } from "@/hooks/useProfile";

export default function WelcomeBanner() {
  const { profile, loading } = useProfile();

  if (loading) return null;

  if (!profile) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-brand-pink/15 via-brand-purple/15 to-brand-teal/15 p-6 text-center">
        <h1 className="text-2xl font-extrabold">Welcome to RG Helper! ✨</h1>
        <p className="mt-2 text-foreground/70">
          Your friendly companion for learning rhythmic gymnastics — track equipment, workouts, and
          skills as you grow.
        </p>
        <Link
          href="/account"
          className="mt-4 inline-block rounded-full bg-brand-purple px-5 py-2 font-semibold text-white hover:opacity-90"
        >
          Set up your profile →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-pink/15 via-brand-purple/15 to-brand-teal/15 p-6">
      <h1 className="text-2xl font-extrabold">Hi {profile.name}! 🌟</h1>
      <p className="mt-1 text-foreground/70">Ready to stretch, learn, and earn some badges today?</p>
    </div>
  );
}
