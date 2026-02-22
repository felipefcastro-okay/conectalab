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
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
            locale === loc
              ? "text-brand-600 font-semibold bg-brand-50"
              : "text-slate-400 hover:text-slate-600"
          }`}
          aria-label={t("label")}
        >
          {t(loc)}
        </button>
      ))}
    </div>
  );
}
