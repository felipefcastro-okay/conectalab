import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl } from "@/lib/constants";

type Track = { title: string; body: string };
type Education = { school: string; course: string };

// Corner marks echo the [ ] of the conecta[lab] logo.
const corners = [
  "-left-3 -top-3 border-l-[3px] border-t-[3px]",
  "-right-3 -top-3 border-r-[3px] border-t-[3px]",
  "-bottom-3 -left-3 border-b-[3px] border-l-[3px]",
  "-bottom-3 -right-3 border-b-[3px] border-r-[3px]",
];

export default function About() {
  const t = useTranslations("About");
  const locale = useLocale();
  const track = t.raw("track") as Track[];
  const education = t.raw("education") as Education[];

  return (
    <section id="about" className="scroll-mt-20 pt-24 lg:pt-32">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <div className="relative mx-auto w-full max-w-sm md:mx-0">
            {corners.map((corner) => (
              <span
                key={corner}
                aria-hidden="true"
                className={`absolute h-8 w-8 border-brand-600 ${corner}`}
              />
            ))}
            <Image
              src="/about/felipe.jpg"
              alt={t("photo_alt")}
              width={800}
              height={1000}
              sizes="(min-width: 768px) 384px, 90vw"
              className="h-auto w-full rounded-[20px]"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur">
              <p className="font-heading font-bold text-ink">{t("name")}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                {t("role")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {t("overline")}
          </p>
          <h2 className="mt-3 text-balance text-3xl sm:text-4xl font-heading font-bold tracking-tight text-ink">
            {t("headline")}
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-ink">{t("lead")}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted">{t("body")}</p>

          <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {t("track_title")}
          </h3>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {track.map((item, index) => (
              <li key={item.title} className="rounded-2xl bg-white p-5 ring-1 ring-line">
                <span className="font-mono text-xs text-brand-600">
                  [{String(index + 1).padStart(2, "0")}]
                </span>
                <p className="mt-3 font-heading font-bold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-12 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {t("education_title")}
          </h3>
          <ul className="mt-4 border-b border-line">
            {education.map((item) => (
              <li
                key={item.school}
                className="flex items-baseline justify-between gap-6 border-t border-line py-3"
              >
                <span className="font-mono text-sm font-bold text-ink">{item.school}</span>
                <span className="text-right text-sm text-muted">{item.course}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">{t("education_note")}</p>

          <Button
            href={getWhatsAppUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            className="mt-10"
          >
            <WhatsAppIcon className="w-4 h-4" />
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
