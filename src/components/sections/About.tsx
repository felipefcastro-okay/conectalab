import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl } from "@/lib/constants";
import { projects } from "@/content/projects";

export default function About() {
  const t = useTranslations("About");
  const locale = useLocale();
  const paragraphs = t.raw("bio") as string[];
  const facts = [
    t("fact_location"),
    t("fact_education"),
    t("fact_courses"),
    t("fact_projects", { count: projects.length }),
  ];

  return (
    <section id="about" className="scroll-mt-20 pt-24 lg:pt-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:items-center lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm md:mx-0">
          <Image
            src="/about/felipe.jpg"
            alt={t("photo_alt")}
            width={800}
            height={1000}
            sizes="(min-width: 768px) 384px, 90vw"
            className="h-auto w-full rounded-[28px] ring-1 ring-line"
          />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {t("overline")}
          </p>
          <h2 className="mt-3 text-balance text-3xl sm:text-4xl font-heading font-bold tracking-tight text-ink">
            {t("headline")}
          </h2>

          <p className="mt-6 text-lg font-heading font-bold text-ink">
            {t("name")}
            <span className="ml-2 font-sans text-base font-normal text-muted">
              {t("role")}
            </span>
          </p>

          <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-xs uppercase tracking-wider text-muted">
            {facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          <Button
            href={getWhatsAppUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="mt-8"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
