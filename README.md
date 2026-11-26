# Ideal Engine

A small showcase site for my recent projects, hosted on GitHub Pages. Each project gets its own page, styled like the app it shows off.

| Page | Project | Repo |
| :-- | :-- | :-- |
| `octo/` | OCTO, a touch-first loop maker for the phone | `ideal-octo-tribble` |
| `pockimusi/` | Pockimusi, a groovebox for the RG35XX Plus | `pockimusi` |
| `ricochet-press/` | Ricochet Press, a brick breaker roguelike | `silver-barnacle` |
| `typeflow/` | TypeFlow, a typing trainer and flow RPG | `typeflow` |
| `darkcull/` | DarkCull, swipe-to-rate photo culling for darktable | `DarkCull` |

## How it's built

Plain HTML and CSS, no build step and no dependencies.

```
index.html            home page (one tile per project)
<project>/index.html  one page per project, with its own palette and type in a <style> block
assets/site.css       shared reset, nav and footer
assets/sky.js         starfield used by the home page tile and the Pockimusi page
assets/img/           screenshots (WebP)
```

Preview locally from the repo root:

```sh
python3 -m http.server 8000
```

then open http://localhost:8000.

## Adding a project

1. Add screenshots to `assets/img/` as WebP (about 1200 px wide for desktop shots, 560 px for phone shots).
2. Copy an existing project folder, rename it, and change its palette, fonts and copy.
3. Add a tile to `index.html`. The tile grid is six columns: big tiles span 3, normal tiles span 2, so pick spans that fill each row.
4. Update the Next links in the page before and after it.

## Deploy

`.github/workflows/pages.yml` publishes the repo to GitHub Pages on every push to `main`.
One-time setup: in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.

## Screenshot notes

- Pockimusi screens come from `pockimusi/tools/screenshot.py`.
- The DarkCull screenshots use generated demo landscapes, not real photos. Swap them for your own shots when you can.
- The TypeFlow Flow screenshot uses a seeded save with 220 words unlocked.
