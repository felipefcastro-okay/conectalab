import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div>
            <Image
              src="/brand/conectalab-logo-horizontal.png"
              alt="CONECTA LAB"
              width={2172}
              height={724}
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="text-slate-400 text-sm mt-2">{t("tagline")}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} CONECTA LAB. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
