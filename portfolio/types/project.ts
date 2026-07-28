export type ProjectCategory = "analytics" | "software" | "it";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  category: ProjectCategory;
  metric: string;          // short pill, e.g. "81% accuracy" — use "[UPDATE: result]" as placeholder
  title: string;
  summary: string;         // one-line card description
  tags: string[];
  problem: string;
  approach: string[];      // bullet list; use a single string element for prose paragraphs
  result: string[];
  images: ProjectImage[];  // first image (or slideshow) shown in the modal
  githubUrl?: string;      // omit or leave "#" for placeholder projects
  hasModal?: boolean;      // false for cards like "IT Support" that are info-only
}
