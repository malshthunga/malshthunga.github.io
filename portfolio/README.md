# Nethmi Malsha — Portfolio (Next.js + Three.js)

## 1. Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 2. Add your images

Copy your existing `assets/` folder (the one from your old vanilla-JS site — profile
photo, dashboards, `closed-loop-eeg.png`, university logo, etc.) into:

```
public/assets/
```

Paths in `data/projects.ts` already point to `/assets/<filename>`, matching your old
structure, so nothing else needs to change for the 6 real projects.

For the placeholder projects, add an image and point `images: [{ src: "/assets/your-file.png", ... }]`
at it — I left `/assets/placeholder.png` as a stand-in, which doesn't exist yet.

## 3. Fill in the remaining projects

Open `data/projects.ts`. Every field still containing `[UPDATE: ...]` is a template —
search the file for `UPDATE` and replace:

- `bicycle-demand` (Data Analytics)
- `flower-classification` (Data Analytics)
- `lms-internship` (Software Engineering)
- `springboot-api` (Software Engineering)
- `java-project` (Software Engineering)

Each project object has the same shape:

```ts
{
  id: "unique-slug",
  category: "analytics" | "software" | "it",
  metric: "short pill text, e.g. '92% F1 score'",
  title: "Project Title",
  summary: "One sentence for the card.",
  tags: ["Tool", "Tool"],
  problem: "One paragraph — what question/need this answered.",
  approach: ["Bullet", "Bullet", "Bullet"],
  result: ["Bullet", "Bullet"],
  images: [{ src: "/assets/file.png", alt: "Description" }],
  githubUrl: "https://github.com/...",
}
```

Adding a 10th project is just adding another object to the array — the grid and modal
system both read straight from this file, no other code changes needed.

## 4. Design system reference

| Token | Value | Use |
|---|---|---|
| `obsidian` | `#0A0A0F` | Page background |
| `surface` / `surface2` | `#121218` / `#191922` | Card / modal surfaces |
| `signal` | `#6E5AF0` | Primary accent (violet) — mesh connections, links |
| `pulse` | `#00E5C7` | Secondary accent (cyan) — metrics, eyebrows, active states |
| `ink` / `muted` | `#F5F5F5` / `#8B8B9A` | Primary / secondary text |

Fonts: **Space Grotesk** (display), **Inter** (body), **JetBrains Mono** (labels/metrics)
— loaded via `next/font/google` in `app/layout.tsx`, no extra setup needed.

### Why a neural mesh instead of the reference site's abstract shape

The hero's 3D piece (`components/Hero3D.tsx`) is a particle system connected into a
mesh — modeled loosely on the EEG electrode network from your flagship project, not a
generic blob. It rotates ambiently and tilts slightly toward the cursor. If you want to
adjust it:

- `NODE_COUNT` — number of particles
- `CONNECT_DISTANCE` — how close two nodes need to be to draw a connecting line (fewer
  connections = sparser mesh)
- Colors are set directly in the `<lineBasicMaterial>` / `<pointsMaterial>` — matches
  `signal` / `pulse` above

## 5. Deploying

Easiest path is [Vercel](https://vercel.com) (made by the Next.js team): push this repo
to GitHub, import it in Vercel, done. No config needed.
