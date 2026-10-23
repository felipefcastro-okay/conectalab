import type { Project } from "@/content/projects";
import { BrowserFrame, PhoneFrame } from "./ProjectFrames";

type ProjectVisualProps = {
  project: Project;
  name: string;
  className?: string;
  priority?: boolean;
};

// The cover leads with phones when the project's first image is a phone;
// otherwise it shows the first browser shot, plus a phone when there is one.
export function coverUsesBrowser(project: Project) {
  return project.images[0]?.kind === "browser";
}

// Composes the project's first images into a cover: browser + phone,
// two phones, or a single browser.
export default function ProjectVisual({ project, name, className = "", priority }: ProjectVisualProps) {
  const browser = project.images.find((image) => image.kind === "browser");
  const phones = project.images.filter((image) => image.kind === "phone");
  const leadsWithPhone = !coverUsesBrowser(project);
  const domain = project.url?.replace(/^https?:\/\//, "");
  const motion = "transition-transform duration-500 ease-out group-hover:-translate-y-2";

  return (
    <div
      className={`relative overflow-hidden rounded-[20px] ${className}`}
      style={{ backgroundColor: project.tint }}
    >
      {leadsWithPhone && phones.length >= 2 ? (
        <div className={`absolute inset-x-0 top-[9%] flex justify-center gap-[5%] ${motion}`}>
          <PhoneFrame image={phones[0]} alt={name} sizes="(min-width: 1024px) 220px, 40vw" className="w-[36%] max-w-[240px]" priority={priority} />
          <PhoneFrame image={phones[1]} alt={name} sizes="(min-width: 1024px) 220px, 40vw" className="mt-[8%] w-[36%] max-w-[240px]" priority={priority} />
        </div>
      ) : browser && phones.length > 0 ? (
        <>
          <BrowserFrame image={browser} alt={name} domain={domain} sizes="(min-width: 1024px) 560px, 80vw" className={`absolute left-[6%] top-[12%] w-[76%] ${motion}`} priority={priority} />
          <PhoneFrame image={phones[0]} alt={name} sizes="(min-width: 1024px) 200px, 30vw" className={`absolute right-[6%] top-[26%] w-[25%] max-w-[220px] ${motion} delay-75`} priority={priority} />
        </>
      ) : browser ? (
        <BrowserFrame image={browser} alt={name} domain={domain} sizes="(min-width: 1024px) 600px, 90vw" className={`absolute left-[8%] right-[8%] top-[14%] ${motion}`} priority={priority} />
      ) : null}
    </div>
  );
}
