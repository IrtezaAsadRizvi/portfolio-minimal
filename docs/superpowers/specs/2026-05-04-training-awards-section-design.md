# Training & Awards Section - Design

## Goal

Add a Training & Awards section to the `/about` page. Each entry shows a provider icon plus text. Clicking an entry opens a modal that previews the certificate PDF and offers a download link. Entries are JSON-driven, localized across all 7 site locales, and tagged with categories so the section can be filtered the same way `/projects` is.

## Page Placement

In `src/components/pages/AboutPage.tsx`, the new section sits between `ExperienceList` and `TechnicalMeta`:

```
AboutHeader
ExperienceList
TrainingList    ← NEW
TechnicalMeta
```

It continues the "what I've done" narrative from work history while staying lighter than experience, leading naturally into the closing meta block.

## Visual Layout

Filter row at the top (button-style, mirrors `ProjectFilters`), followed by a stack of training rows. Each row uses the same `grid-cols-1 md:grid-cols-[1fr_auto]` pattern as `ExperienceList` so the period stays right-aligned:

```
[provider icon 32px]   Claude Code in Action            [APR 2025]
                       Anthropic - Engineering
                       Hands-on workshop on agentic coding
                       loops, MCP, and Claude Code skills.

                       [View certificate ->]
```

The entire row is a `<button>` (semantic - it triggers a dialog) with an `aria-label` describing the action. The whole section is wrapped in `Reveal` to match the rest of the about page's animation parity.

## Categories

Section-specific category set (separate from `/projects` because training is a different axis):

- `All`
- `AI`
- `Engineering`
- `Security`

Category keys stay in English across all locales (used for filtering); only `label` strings are translated.

## Data Shape

A new top-level `training` key in every `about.json`:

```json
"training": {
  "sectionTitle": "Training & Awards",
  "categories": [
    { "key": "All",         "label": "All" },
    { "key": "AI",          "label": "AI" },
    { "key": "Engineering", "label": "Engineering" },
    { "key": "Security",    "label": "Security" }
  ],
  "items": [
    {
      "slug": "claude-code-in-action",
      "title": "Claude Code in Action",
      "provider": "Anthropic",
      "providerIcon": "/training/icons/anthropic.svg",
      "category": "AI",
      "tag": "Agentic Coding",
      "period": "APR 2025",
      "description": "Hands-on workshop on agentic coding loops, MCP, and Claude Code skills.",
      "certificate": "/training/certificates/claude-code-in-action.pdf",
      "viewLabel": "View certificate →",
      "downloadLabel": "Download PDF"
    }
  ]
}
```

### Field rationale

- `slug` - stable React key and future-proofing for deep-linking (not implemented now).
- `category` matches the projects-pattern filter key; `tag` is free-text under the title.
- `providerIcon` and `certificate` are absolute URLs under `/training/...` so they resolve at runtime under the static export.
- `viewLabel` and `downloadLabel` are per-item to keep all localized strings co-located with the entry they belong to.
- All strings use ASCII hyphens; no em-dashes anywhere (project rule).

### i18n duplication

The `training` block is added to all 7 `about.json` files (en, de, es, fr, zh, bn, ar) with structural fields duplicated as-is and human-readable strings translated. No changes to `lib/i18n.ts` are required - the `About` type infers automatically from `enAbout`.

## Asset Relocation

The icon and PDF currently live in `src/assets/`, which is unused elsewhere. For static export to serve them at runtime, they move to `public/training/`:

- `src/assets/images/anthropic_icon.svg` -> `public/training/icons/anthropic.svg`
- `src/assets/pdfs/certificate_claude_code_in_action.pdf` -> `public/training/certificates/claude-code-in-action.pdf`

The `src/assets/` source files are deleted (zero current importers).

## Modal UX

Triggered by clicking a training row. Renders into a portal at `<body>` (avoids z-index and transform-clipping interactions with `Reveal`'s parent transforms).

```
+----------------------------------------------+
| Title       Provider - Period      [Close x] |
|----------------------------------------------|
|                                              |
|  [tilt wrapper containing iframe + overlay]  |
|                                              |
|----------------------------------------------|
|                          [Download PDF v]    |
+----------------------------------------------+
```

- Backdrop: `bg-surface/80 backdrop-blur-sm`, fades in.
- Content: centered, `max-w-4xl`, ~80vh tall, three regions stacked (header / preview / footer).
- Download button is a plain `<a href={cert} download>` - no JS, no fetch, works under static export.
- Dismissal: ESC key, backdrop click, explicit close button.
- Body scroll locked while open.
- Focus trapped inside the modal; restores to trigger element on close.
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on the title.

## Tilt Effect

Vanilla `<Tilt>` wrapper (no dependency). Lives at `src/components/Tilt.tsx`.

- A transparent overlay div sits above the iframe to capture `mousemove` and `mouseleave`. The iframe itself has `pointer-events: none`. Trade-off: users cannot scroll inside the PDF, which is fine for a single-page certificate where the goal is preview + download.
- On `mousemove`: cursor position is normalized to `[-1, 1]` per axis relative to the wrapper, then `transform: perspective(1000px) rotateX(-y * maxTilt) rotateY(x * maxTilt)` is applied to the wrapper.
- `maxTilt: 8deg`, `perspective: 1000px`.
- `transition: transform 200ms ease-out` on `mouseleave` (snap back); no transition during `mousemove` (responsive feel).
- `useRef` plus `requestAnimationFrame` throttle - one CSS update per frame, no React re-renders during mousemove.
- `will-change: transform` and `backface-visibility: hidden` to keep PDF rendering crisp during the rotation.
- `prefers-reduced-motion: reduce` disables tilt entirely (static iframe).

No glare layer in v1 - tilt alone reads as "physical certificate". Add later if it looks flat.

## Component Breakdown

Five new files, all small and single-purpose, all under `src/components/`.

### `Tilt.tsx` (`"use client"`, ~50 lines)

Generic 3D-tilt wrapper. Props:
- `maxTilt?: number` (default `8`)
- `perspective?: number` (default `1000`)
- `disabled?: boolean`
- `children: ReactNode`

Internals as described above.

### `TrainingModal.tsx` (`"use client"`, ~80 lines)

Portal'd dialog. Props:
- `item: TrainingItem | null` (null = closed)
- `onClose: () => void`

Responsibilities:
- Render backdrop + dialog into `document.body` via `createPortal`.
- Wire ESC, backdrop click, close button.
- Lock body scroll while open.
- Focus trap (Tab/Shift-Tab cycles within dialog); restore focus on close.
- Render `<Tilt>` containing the iframe and transparent overlay.
- Render `<a href={item.certificate} download>` for download.
- Iframe `onError` handler shows a "Failed to load certificate" fallback inside the tilt frame.

### `TrainingItem.tsx` (`"use client"`, ~50 lines)

One row. Props:
- `item: TrainingItem`
- `onSelect: (item: TrainingItem) => void`

Renders provider icon, title, provider, period, description, view-certificate affordance. Wraps everything in a `<button>` with `aria-label="View certificate: <title>"`.

### `TrainingFilters.tsx` (`"use client"`, ~30 lines)

Inlined clone of `ProjectFilters`. Same Tailwind classes, same button row, same active-state treatment. Not generalized from `ProjectFilters` because:
- `ProjectFilters` is 12 lines; generalizing for two callers adds an interface for one extra caller.
- If a third caller appears, extract then.

Props:
- `categories: { key: string; label: string }[]`
- `active: string`
- `onChange: (key: string) => void`

### `TrainingList.tsx` (`"use client"`, ~70 lines)

Holds the filter state and the open-modal state. Reads `getContent(locale).about.training`. Renders:
- `<TrainingFilters>` at the top.
- A list of `<TrainingItem>` rows filtered by active category.
- `<TrainingModal>` (controlled by selected-item state).

Returns `null` (no heading) if `items.length === 0` so empty locales don't render an empty section.

## Wiring

`AboutPage.tsx` adds one import and one component:

```tsx
import TrainingList from "@/components/TrainingList";
// ...
<AboutHeader locale={locale} />
<ExperienceList locale={locale} />
<TrainingList locale={locale} />
<TechnicalMeta locale={locale} />
```

No changes to `lib/i18n.ts`. No new dependencies in `package.json`.

## Edge Cases

- **Empty training list**: `TrainingList` returns `null`.
- **Missing icon**: `<img>` falls back to `alt={provider}` text.
- **Iframe load error**: shows "Failed to load certificate" inside the tilt frame.
- **Long titles/descriptions**: row layout wraps text naturally; modal title uses `truncate`.
- **Mobile**: tilt is pointer-driven and stays at rest on touch devices. Modal goes full-bleed below `md`. Iframe height drops to `60vh` so the download button stays visible.
- **RTL (Arabic)**: filter row, item grid, and modal header flow correctly with Tailwind logical properties. Arrow glyphs in localized strings flip per existing convention in `ar/about.json`.

## Accessibility

- Row trigger: `<button>` with `aria-label`.
- Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- Focus trap on Tab/Shift-Tab; focus restoration on close.
- ESC closes the modal.
- Close button: `aria-label="Close"`.
- `prefers-reduced-motion` disables `Tilt` (`Reveal` is already wired separately).

## Verification

The codebase has no test runner. Validation strategy follows existing project discipline:

1. `npm run lint`
2. `npm run build` - catches type errors and static-export issues.
3. Manual browser check at `/about` and `/de/about` (default and a non-default locale): row click opens modal, ESC and backdrop click close, download works, tilt responds smoothly, RTL renders cleanly at `/ar/about`.

## Out of Scope

- Deep-linking via `?cert=<slug>` URL params.
- Glare layer on tilt.
- Multi-page PDF support inside the modal (single-page cert; iframe with `pointer-events: none` is sufficient).
- Standalone `/training` page or RSS-style listing.
- Test runner introduction.
