import { useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";

// Alternating 7/5 and 5/7 columns keep the grid from reading as a template.
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

// With an odd count, the last card would sit alone next to an empty slot.
const isLoneLast = (index: number) =>
  projects.length % 2 === 1 && index === projects.length - 1;

export default function Projects() {
  const t = useTranslations("ProjectsSection");

  return (
    <section id="projects" className="scroll-mt-20 pb-24 lg:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {t("overline")} <span className="text-ink">({String(projects.length).padStart(2, "0")})</span>
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-heading font-bold tracking-tight text-ink">
              {t("headline")}
            </h2>
          </div>
          <p className="max-w-sm text-muted">{t("subheadline")}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              className={
                isLoneLast(index) ? "md:col-span-2 lg:col-span-12" : spans[index % spans.length]
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
