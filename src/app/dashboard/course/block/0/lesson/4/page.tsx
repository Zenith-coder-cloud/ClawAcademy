"use client";

import Image from "next/image";
import Link from "next/link";

function Check() {
  return (
    <svg className="w-5 h-5 text-[#FF4422] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SectionImage({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="my-6">
      <Image src={src} alt={caption || ""} width={1200} height={675} className="rounded-xl w-full" />
