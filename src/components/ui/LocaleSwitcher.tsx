"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      className="flex items-center gap-1 font-mono text-xs"
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          aria-pressed={locale === loc}
          className={`px-2 py-1 rounded-full transition-colors cursor-pointer ${
            locale === loc
              ? "bg-ink text-white"
              : "text-muted hover:text-ink"
          }`}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
