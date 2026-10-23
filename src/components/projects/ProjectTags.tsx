import { useTranslations } from "next-intl";
import type { Platform, ProjectStatus } from "@/content/projects";

export function PlatformList({ platforms }: { platforms: Platform[] }) {
  const t = useTranslations("Platforms");

  return (
    <ul className="flex flex-wrap gap-1.5">
      {platforms.map((platform) => (
        <li
          key={platform}
          className="rounded-full border border-line bg-white px-2.5 py-0.5 font-mono text-[11px] text-muted"
        >
          {t(platform)}
        </li>
      ))}
    </ul>
  );
}

export function StatusLabel({ status }: { status: ProjectStatus }) {
  const t = useTranslations("ProjectMeta");

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] uppercase tracking-wider text-muted">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "live" ? "bg-emerald-500" : "bg-amber-500"
        }`}
      />
      {t(status === "live" ? "status_live" : "status_launching")}
    </span>
  );
}
