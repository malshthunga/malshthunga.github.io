"use client";

import { Project } from "@/types/project";

interface Props {
  project: Project;
  onOpen: (id: string) => void;
}

export default function ProjectCard({ project, onOpen }: Props) {
  const clickable = project.hasModal !== false;

  return (
    <button
      onClick={() => clickable && onOpen(project.id)}
      className={`card-surface group flex flex-col items-start gap-4 p-6 text-left ${
        clickable ? "cursor-pointer" : "cursor-default"
      }`}
      aria-haspopup={clickable ? "dialog" : undefined}
    >
      <span className="metric-pill">{project.metric}</span>

      <h3 className="font-display text-xl font-medium leading-snug text-ink">
        {project.title}
      </h3>

      <p className="text-sm leading-relaxed text-muted">{project.summary}</p>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>

      {clickable && (
        <span className="mt-1 text-sm font-medium text-pulse transition-transform group-hover:translate-x-1">
          View project →
        </span>
      )}
    </button>
  );
}
