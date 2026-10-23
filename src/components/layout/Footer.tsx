import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { EMAIL, getWhatsAppUrl } from "@/lib/constants";
import { projects } from "@/content/projects";

export default function Footer() {
  const t = useTranslations("Footer");
  const p = useTranslations("Projects");
  const h = useTranslations("Header");
  const locale = useLocale();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/conectalab-logo-horizontal.png"
              alt="CONECTA LAB"
              width={2172}
              height={724}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-white/60 text-sm mt-3">{t("tagline")}</p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-white/40">
              {h("projects")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {p(`${project.slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-white/40">
              {h("contact")}
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={getWhatsAppUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} CONECTA LAB. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
