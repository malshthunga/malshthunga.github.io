"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projects, categoryMeta } from "@/data/projects";
import SafeImage from "@/components/SafeImage";
import CertificationSection from "@/components/CertificationSection";

// Three.js touches window/canvas APIs — load client-side only
const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });
export default function Home() {
  const [openId, setOpenId] = useState<string | null>(null);
  const activeProject = projects.find((p) => p.id === openId) ?? null;

  const byCategory = (cat: keyof typeof categoryMeta) =>
    projects.filter((p) => p.category === cat);

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6">
        <div className="ambient-grid absolute inset-0 bg-grid-fade opacity-60" />
        <Hero3D />
        <div className="absolute inset-0 -z-[5] bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                Open to IT Support · Data · AI/ML roles
              </span>
            </div>

            <p className="font-mono text-xs uppercase tracking-widest text-pulse">
              IT GRADUATE
            </p>
            <h1 className="mt-4 font-display text-display-xl font-medium text-ink">
              NETHMI
              <br />
              MALSHA
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
Adelaide-based IT graduate with a genuine love for making messy things make sense, whether that's data, code, or a broken laptop. I work across data analytics, IT support, and software engineering. Open to roles in any of those
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Python", "SQL", "Power BI", "Excel", "scikit-learn", "Machine Learning"].map((skill) => (
                <span key={skill} className="tag-pill">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-line bg-surface/60 p-4 backdrop-blur-sm sm:w-fit">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-surface2">
                <SafeImage
                  src="/assets/university-logo.jpg"
                  alt="Adelaide University"
                  fill
                  className="object-cover"
                  fallbackLabel="Logo"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">Bachelor of Information Technology</p>
                <p className="text-xs text-muted">
                  Artificial Intelligence &amp; Machine Learning · Adelaide University
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-signal/80"
               >
                Resume
              </a>
              <a
                href="https://www.linkedin.com/in/nethmi-ranathunga/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-signal"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/malshthunga"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-signal"
              >
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-3xl border border-line shadow-[0_0_60px_-15px_rgba(110,90,240,0.5)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            <SafeImage
              src="/assets/profile.JPG"
              alt="Nethmi Malsha"
              fill
              className="object-cover"
              fallbackLabel="Add photo"
            />
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-line" />
        </div>
      </section>

      {/* ── DATA ANALYTICS ──────────────────────────────────── */}
      <Section
        eyebrow="Portfolio"
        title={categoryMeta.analytics.label}
        description={categoryMeta.analytics.description}
      >
        {byCategory("analytics").map((project) => (
          <motion.div
            key={project.id}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            <ProjectCard project={project} onOpen={setOpenId} />
          </motion.div>
        ))}
      </Section>

      {/* ── SOFTWARE ENGINEERING ────────────────────────────── */}
      <Section
        eyebrow="Portfolio"
        title={categoryMeta.software.label}
        description={categoryMeta.software.description}
      >
        {byCategory("software").map((project) => (
          <motion.div
            key={project.id}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            <ProjectCard project={project} onOpen={setOpenId} />
          </motion.div>
        ))}
      </Section>

      {/* ── IT SUPPORT ───────────────────────────────────────── */}
      <Section
        eyebrow="Portfolio"
        title={categoryMeta.it.label}
        description={categoryMeta.it.description}
      >
        {byCategory("it").map((project) => (
          <motion.div
            key={project.id}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            <ProjectCard project={project} onOpen={setOpenId} />
          </motion.div>
        ))}
      </Section>
      
      <CertificationSection/>

      <footer className="border-t border-line px-6 py-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          Nethmi Malsha Portfolio
        </p>
      </footer>

      <ProjectModal project={activeProject} onClose={() => setOpenId(null)} />
    </main>
  );
}