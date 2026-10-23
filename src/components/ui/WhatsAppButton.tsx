"use client";

import { useLocale } from "next-intl";
import { getWhatsAppUrl } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function WhatsAppButton() {
  const locale = useLocale();

  return (
    <a
      href={getWhatsAppUrl(locale)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" />
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-200 group-hover:scale-110">
        <WhatsAppIcon className="w-7 h-7" />
      </span>
    </a>
  );
}
