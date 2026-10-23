import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import { MailIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { getWhatsAppUrl, EMAIL } from "@/lib/constants";

export default function CTA() {
  const t = useTranslations("CTA");
  const locale = useLocale();

  return (
    <section id="contact" className="scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-[32px] bg-ink px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
          <h2 className="max-w-2xl text-balance text-3xl sm:text-5xl font-heading font-bold tracking-tight text-white leading-[1.05]">
            {t("headline")}
          </h2>
          <p className="mt-5 max-w-lg text-lg text-white/60 leading-relaxed">
            {t("subheadline")}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              href={getWhatsAppUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon />
              {t("whatsapp")}
            </Button>
            <Button href={`mailto:${EMAIL}`} variant="light" size="lg">
              <MailIcon />
              {t("email")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
