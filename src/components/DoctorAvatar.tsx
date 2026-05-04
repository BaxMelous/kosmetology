"use client";

import Image from "next/image";

type DoctorAvatarProps = {
  src: string | null;
  alt: string;
  fallbackLetter: string;
};

export function DoctorAvatar({ src, alt, fallbackLetter }: DoctorAvatarProps) {
  const useDirectImageSrc =
    src?.startsWith("/api/doctor-images/") || src?.includes("images.unsplash.com") || false;

  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300 text-3xl font-semibold text-slate-500">
        {fallbackLetter}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 144px, (max-width: 1024px) 160px, 176px"
      loading="lazy"
      decoding="async"
      quality={75}
      unoptimized={useDirectImageSrc}
      className="object-cover"
    />
  );
}
