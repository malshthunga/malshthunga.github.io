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
    {/* terminal-style header bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-black/20 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted/70">
          {project.category}
        </span>
      </div>

      <div className="flex flex-col items-start gap-4 p-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
          </span>
          <span className="metric-pill">{project.metric}</span>
        </div>

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
          <span className="mt-1 font-mono text-sm font-medium text-pulse transition-transform group-hover:translate-x-1">
            view_project()
          </span>
        )}
      </div>
    </button>
  );
}
