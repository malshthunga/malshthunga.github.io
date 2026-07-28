"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setSlide(0);
  }, [project?.id]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.classList.toggle("modal-locked", !!project);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("modal-locked");
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            className="card-surface relative max-h-[85vh] w-full max-w-2xl overflow-y-auto"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface2 text-xl text-muted hover:text-ink"
            >
              &times;
            </button>

            {project.images.length > 0 && (
              <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-surface2">
                <div className="relative h-full w-full">
                  {project.images.map((img, i) => (
                    <Image
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        i === slide ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
                {project.images.length > 1 && (
                  <>
                    <button
                      aria-label="Previous image"
                      onClick={() => setSlide((s) => (s - 1 + project.images.length) % project.images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-obsidian/60 px-3 py-1 text-lg text-ink hover:bg-obsidian/90"
                    >
                      ‹
                    </button>
                    <button
                      aria-label="Next image"
                      onClick={() => setSlide((s) => (s + 1) % project.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-obsidian/60 px-3 py-1 text-lg text-ink hover:bg-obsidian/90"
                    >
                      ›
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          aria-label={`Go to image ${i + 1}`}
                          onClick={() => setSlide(i)}
                          className={`h-1.5 w-1.5 rounded-full ${i === slide ? "bg-pulse" : "bg-ink/30"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="p-6 sm:p-8">
              <h2 id="modal-title" className="font-display text-2xl font-medium text-ink">
                {project.title}
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              {project.problem && (
                <>
                  <h4 className="mt-6 font-mono text-xs uppercase tracking-wide text-pulse">Problem</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</p>
                </>
              )}

              {project.approach.length > 0 && (
                <>
                  <h4 className="mt-6 font-mono text-xs uppercase tracking-wide text-pulse">Approach</h4>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                    {project.approach.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </>
              )}

              {project.result.length > 0 && (
                <>
                  <h4 className="mt-6 font-mono text-xs uppercase tracking-wide text-pulse">Result</h4>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                    {project.result.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-signal hover:text-pulse"
                >
                  View repository on GitHub →
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
