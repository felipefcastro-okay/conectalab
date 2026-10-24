import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Button from "@/components/ui/Button";
import ProjectVisual, { coverUsesBrowser } from "@/components/projects/ProjectVisual";
import { BrowserFrame, PhoneFrame } from "@/components/projects/ProjectFrames";
import { PlatformList, StatusLabel } from "@/components/projects/ProjectTags";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/Icons";
import { Link } from "@/i18n/navigation";
import { getNextProject, getProject } from "@/content/projects";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const t = await getTranslations({ locale, namespace: `Projects.${slug}` });
  return {
    title: `${t("name")} | CONECTA LAB`,
    description: t("summary"),
    alternates: {
      canonical: `/projetos/${slug}`,
      languages: { "pt-BR": `/projetos/${slug}`, en: `/en/projetos/${slug}` },
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: `Projects.${slug}` });
  const meta = await getTranslations({ locale, namespace: "ProjectMeta" });
  const next = getNextProject(slug);
  const nextT = await getTranslations({ locale, namespace: `Projects.${next.slug}` });
  const highlights = t.raw("highlights") as string[];
  const phones = project.images.filter((image) => image.kind === "phone");
  const browsers = project.images
    .filter((image) => image.kind === "browser")
    .slice(coverUsesBrowser(project) ? 1 : 0);
  const domain = project.url?.replace(/^https?:\/\//, "");

  return (
    <>
      <Header />
      <main>
        <section className="pt-28 lg:pt-32">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Link
              href={{ pathname: "/", hash: "projects" }}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
            >
              <ArrowLeftIcon />
              {meta("back")}
            </Link>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  {t("category")}
                </p>
                <h1 className="mt-4 text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-[-0.035em] text-ink leading-[1.02]">
                  {t("name")}
                </h1>
                <p className="mt-5 max-w-xl text-xl text-muted leading-relaxed">
                  {t("tagline")}
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 lg:border-t-0 lg:pt-0">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{meta("status")}</dt>
                  <dd className="mt-2"><StatusLabel status={project.status} /></dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{meta("year")}</dt>
                  <dd className="mt-2 text-sm text-ink">{project.year}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{meta("platforms")}</dt>
                  <dd className="mt-2"><PlatformList platforms={project.platforms} /></dd>
                </div>
                {project.url && (
                  <div className="col-span-2">
                    <Button href={project.url} target="_blank" rel="noopener noreferrer">
                      {meta("visit")}
                      <ArrowUpRightIcon />
                    </Button>
                  </div>
                )}
              </dl>
            </div>

            <ProjectVisual
              project={project}
              name={t("name")}
              priority
              className="mt-12 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[600px]"
            />
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr_0.9fr] lg:gap-10">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{meta("challenge")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink">{t("challenge")}</p>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{meta("built")}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink">{t("built")}</p>
            </div>
            <div className="rounded-[24px] bg-white p-6 ring-1 ring-line">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{meta("highlights")}</h2>
              <ul className="mt-4 space-y-3">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {(phones.length > 0 || browsers.length > 0) && (
          <section className="pb-20 lg:pb-28">
            <div className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6">
              {phones.length > 0 && (
                <div
                  className="grid grid-cols-3 gap-3 rounded-[24px] p-4 sm:gap-6 sm:p-10 lg:p-14"
                  style={{ backgroundColor: project.tint }}
                >
                  {phones.map((image) => (
                    <PhoneFrame key={image.src} image={image} alt={t("name")} sizes="(min-width: 1024px) 320px, 30vw" />
                  ))}
                </div>
              )}
              {browsers.map((image) => (
                <div
                  key={image.src}
                  className="rounded-[24px] p-4 sm:p-10 lg:p-14"
                  style={{ backgroundColor: project.tint }}
                >
                  <BrowserFrame image={image} alt={t("name")} domain={domain} sizes="(min-width: 1024px) 1000px, 90vw" />
                </div>
              ))}
            </div>
          </section>
        )}

        {project.examples && (
          <section className="pb-20 lg:pb-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{meta("examples")}</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {project.examples.map((example) => (
                  <a
                    key={example.key}
                    href={example.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-[28px] bg-white p-3 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_20px_50px_-30px_rgba(18,19,22,0.4)]"
                  >
                    <div className="rounded-[20px] p-4 sm:p-6" style={{ backgroundColor: project.tint }}>
                      <BrowserFrame
                        image={example.image}
                        alt={example.name}
                        domain={example.url.replace(/^https?:\/\//, "")}
                        sizes="(min-width: 768px) 520px, 90vw"
                        className="transition-transform duration-500 ease-out group-hover:-translate-y-1"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4 px-3 pb-2 pt-5">
                      <div>
                        <p className="text-lg font-heading font-bold text-ink">{example.name}</p>
                        <p className="text-sm text-muted">{t(`examples.${example.key}`)}</p>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRightIcon />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Link
              href={`/projetos/${next.slug}`}
              className="group flex items-center justify-between gap-6 py-12"
            >
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{meta("next")}</p>
                <p className="mt-2 text-3xl sm:text-4xl font-heading font-bold tracking-tight text-ink">
                  {nextT("name")}
                </p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRightIcon className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
