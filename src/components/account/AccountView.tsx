"use client";

import { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import ProfileForm from "@/components/account/ProfileForm";
import ProfileSummaryCard from "@/components/account/ProfileSummaryCard";
import { useProfile } from "@/hooks/useProfile";

export default function AccountView() {
  const { profile, saveProfile, loading } = useProfile();
  const [editing, setEditing] = useState(false);

  if (loading) {
    return <p className="text-foreground/60">Loading your profile...</p>;
  }

  const showForm = editing || !profile;

  return (
    <>
      <PageHeader
        emoji="🙋"
        title="Me"
        subtitle="Tell us a bit about you so we can personalize equipment sizing."
      />
      {showForm ? (
        <ProfileForm
          initialProfile={profile}
          onSave={async (next) => {
            await saveProfile(next);
            setEditing(false);
          }}
          onCancel={profile ? () => setEditing(false) : undefined}
        />
      ) : (
        <ProfileSummaryCard profile={profile} onEdit={() => setEditing(true)} />
      )}
    </>
  );
}
