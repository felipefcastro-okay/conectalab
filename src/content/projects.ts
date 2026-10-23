// Portfolio source of truth. Texts live in messages under `Projects.<slug>`;
// adding a project means one entry here plus its translations.

export type Platform = "ios" | "android" | "web";
export type ProjectStatus = "live" | "launching";

export type ProjectImage = {
  src: string;
  kind: "browser" | "phone";
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  url?: string;
  year: number;
  platforms: Platform[];
  status: ProjectStatus;
  tint: string;
  images: ProjectImage[];
};

// Browser shots are cropped to 2:1.
const browser = (src: string, width = 2000): ProjectImage => ({
  src,
  kind: "browser",
  width,
  height: width / 2,
});

const phone = (src: string, height: number): ProjectImage => ({
  src,
  kind: "phone",
  width: 900,
  height,
});

export const projects: Project[] = [
  {
    slug: "elus-food",
    url: "https://elusfood.com.br",
    year: 2026,
    platforms: ["ios", "android", "web"],
    status: "live",
    tint: "#f1e8df",
    images: [
      browser("/projects/elus-food/web.jpg"),
      phone("/projects/elus-food/app-1.jpg", 1955),
      phone("/projects/elus-food/app-2.jpg", 1955),
      phone("/projects/elus-food/app-3.jpg", 1955),
    ],
  },
  {
    slug: "npslab",
    url: "https://npslab.cc",
    year: 2025,
    platforms: ["ios", "android", "web"],
    status: "live",
    tint: "#e2efe6",
    images: [
      phone("/projects/npslab/app-1.jpg", 1951),
      phone("/projects/npslab/app-2.jpg", 1951),
      phone("/projects/npslab/app-3.jpg", 1951),
      browser("/projects/npslab/web.jpg"),
    ],
  },
  {
    slug: "elus",
    url: "https://elus.cc",
    year: 2026,
    platforms: ["web"],
    status: "launching",
    tint: "#e9e7f3",
    images: [browser("/projects/elus/web.jpg")],
  },
  {
    slug: "paina",
    url: "https://institutopaina.com.br",
    year: 2026,
    platforms: ["web", "ios", "android"],
    status: "live",
    tint: "#f3e6d9",
    images: [
      browser("/projects/paina/web.jpg"),
      browser("/projects/paina/pei.jpg"),
    ],
  },
  {
    slug: "sites",
    url: "https://sites.conectalab.cc",
    year: 2026,
    platforms: ["web"],
    status: "live",
    tint: "#e3eaf7",
    images: [browser("/projects/sites/web.jpg")],
  },
  {
    slug: "digitocrm",
    year: 2025,
    platforms: ["web"],
    status: "live",
    tint: "#e4e8f1",
    images: [browser("/projects/digitocrm/web.jpg", 1376)],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
