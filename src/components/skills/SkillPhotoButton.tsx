"use client";

import { ChangeEvent, useRef, useState } from "react";
import { resizeImageFile } from "@/lib/image";

interface SkillPhotoButtonProps {
  photoDataUrl?: string;
  skillName: string;
  onChange: (photoDataUrl: string | undefined) => void;
}

export default function SkillPhotoButton({ photoDataUrl, skillName, onChange }: SkillPhotoButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    try {
      const dataUrl = await resizeImageFile(file);
      onChange(dataUrl);
      setError(null);
    } catch {
      setError("Couldn't load that photo.");
    }
  };

  return (
    <>
      <div className="flex shrink-0 flex-col items-center gap-1">
        <button
          type="button"
          onClick={() => (photoDataUrl ? setLightboxOpen(true) : fileInputRef.current?.click())}
          aria-label={photoDataUrl ? `View photo for ${skillName}` : `Add a photo for ${skillName}`}
          title={photoDataUrl ? "View photo" : "Add a photo"}
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border-2 border-brand-pink/20 bg-brand-pink/5 hover:border-brand-pink/50"
        >
          {photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- small local data-URL thumbnail
            <img src={photoDataUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-lg">📷</span>
          )}
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        {error && <p className="max-w-[4.5rem] text-center text-[9px] leading-tight text-rose-600">{error}</p>}
      </div>

      {lightboxOpen && photoDataUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-card p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-2 text-sm font-semibold">{skillName}</p>
            {/* eslint-disable-next-line @next/next/no-img-element -- small local data-URL image */}
            <img src={photoDataUrl} alt={skillName} className="max-h-[65vh] w-full rounded-xl object-contain" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-semibold text-brand-purple hover:underline"
              >
                Replace photo
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onChange(undefined);
                    setLightboxOpen(false);
                  }}
                  className="text-sm text-rose-600 hover:underline"
                >
                  Remove
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="text-sm text-foreground/60 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
