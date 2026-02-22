import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-1.5">
              <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-heading font-bold text-lg text-white">
                CONECTA<span className="text-brand-400">LAB</span>
              </span>
            </div>
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
