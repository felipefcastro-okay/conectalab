import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";
import ProjectVisual from "./ProjectVisual";
import { PlatformList, StatusLabel } from "./ProjectTags";
import { ArrowUpRightIcon } from "@/components/ui/Icons";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const t = useTranslations(`Projects.${project.slug}`);
  const meta = useTranslations("ProjectMeta");

  return (
    <Link
      href={`/projetos/${project.slug}`}
      className={`group flex flex-col rounded-[28px] bg-white p-3 ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_20px_50px_-30px_rgba(18,19,22,0.4)] ${className}`}
    >
      <ProjectVisual
        project={project}
        name={t("name")}
        className="aspect-[4/3] lg:aspect-auto lg:h-[400px]"
      />

      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {t("category")} · {project.year}
          </p>
          <StatusLabel status={project.status} />
        </div>

        <h3 className="mt-3 text-2xl font-heading font-bold tracking-tight text-ink">
          {t("name")}
        </h3>
        <p className="mt-1 text-muted leading-relaxed">{t("summary")}</p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <PlatformList platforms={project.platforms} />
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink">
            <span className="hidden sm:inline">{meta("view")}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRightIcon />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
