"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export default function Section({ eyebrow, title, description, children }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-pulse">{eyebrow}</span>
        <h2 className="mt-3 font-display text-display-lg font-medium text-ink">{title}</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{description}</p>
      </motion.div>

      <motion.div
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {children}
      </motion.div>
    </section>
  );
}
