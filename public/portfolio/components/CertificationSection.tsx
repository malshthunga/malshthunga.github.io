import { certifications, clearances } from "@/data/certification";

export default function CertificationSection() {
    return (
        <section className="border-t border-white/5 px-6 py-16">
        <div className="mx-auto max-w-5xl">
            <span className="font-mono text-xs uppercase tracking-widest text-teal-400">
                Portfolio
            </span>
            <h2 className="font-display mt-2 text-3xl font-medium text-ink">
                Certifications
            </h2>
            <p className="mt-2 text-sm text-muted">
                Verified credentials and clearances
            </p>

            {/* certification badges */}
            <div className="mt-8 flex flex-wrap gap-3">
                {certifications.map((cert) => (
                    <a
                    key={cert.id}
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-surface flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/30">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
                    </span>
                    <div>
                        <p className="text-sm font-medium leading-snug text-ink">
                        {cert.name}
                        </p>
                        <p className="font-mono text-[11px] text-muted">
                        {cert.issuer} · {cert.date}
                        </p>
                    </div>
                </a>
            ))}
        </div>
        {/* clearances — quieter, single line */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/5 pt-6">
          {clearances.map((c) => (
            <span
              key={c.label}
              className="font-mono text-xs text-muted"
            >
              {c.label} —{" "}
              <span className="text-teal-400/80">{c.status}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}