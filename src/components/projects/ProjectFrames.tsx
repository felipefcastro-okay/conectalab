import Image from "next/image";
import type { ProjectImage } from "@/content/projects";

type FrameProps = {
  image: ProjectImage;
  alt: string;
  sizes: string;
  domain?: string;
  className?: string;
  priority?: boolean;
};

export function BrowserFrame({ image, alt, sizes, domain, className = "", priority }: FrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_24px_60px_-24px_rgba(18,19,22,0.35)] ${className}`}
    >
      <div className="flex h-7 items-center gap-1.5 border-b border-black/5 bg-white px-3">
        <span className="h-2 w-2 rounded-full bg-black/10" />
        <span className="h-2 w-2 rounded-full bg-black/10" />
        <span className="h-2 w-2 rounded-full bg-black/10" />
        {domain && (
          <span className="ml-3 truncate font-mono text-[10px] text-black/40">{domain}</span>
        )}
      </div>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  );
}

export function PhoneFrame({ image, alt, sizes, className = "", priority }: FrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-[22px] shadow-[0_24px_60px_-24px_rgba(18,19,22,0.45)] ring-1 ring-black/5 ${className}`}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="block h-auto w-full"
      />
    </div>
  );
}
