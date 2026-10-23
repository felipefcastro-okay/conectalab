import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl } from "@/lib/constants";
import { projects } from "@/content/projects";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const liveCount = projects.filter((project) => project.status === "live").length;

  return (
    <section className="pt-36 pb-16 lg:pt-44 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {t("overline")}
        </p>

        <h1 className="mt-6 max-w-4xl text-balance text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5.25rem] font-heading font-bold tracking-[-0.035em] text-ink">
          {t("headline")}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-xl text-lg sm:text-xl text-muted leading-relaxed">
            {t("subheadline")}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button href="#projects" size="lg">
              {t("cta_primary")}
              <ArrowRightIcon />
            </Button>
            <Button
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
            >
              {t("cta_secondary")}
            </Button>
          </div>
        </div>

        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6 font-mono text-xs uppercase tracking-wider text-muted">
          <li className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t("stat_live", { count: liveCount })}
          </li>
          <li>{t("stat_platforms")}</li>
          <li>{t("stat_since")}</li>
        </ul>
      </div>
    </section>
  );
}
