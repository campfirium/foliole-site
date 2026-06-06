# Foliole Site

Official static homepage for Foliole, a local-first incremental reading workspace.

## Local preview

Build the static pages, then serve the repository root:

```sh
npm run build
python3 -m http.server 4173
```

Open `http://localhost:4173/`. The site uses root-relative asset URLs so language subpages resolve consistently under the local server and on GitHub Pages.

## Localization

Website copy lives in `content/*.json`. `content/en.json` defines the required key structure; `npm run build` fails if another locale is missing a key. English is published at `/`, and other languages are generated into locale subdirectories such as `/fr/`, `/ja/`, `/zh-hans/`, and `/zh-hant/`.

The root page detects the browser language on first visit and redirects to a supported locale page. Manual language menu selection stores a local preference marker so later visits to `/` stay under user control.

## GitHub Pages

This repository is intended to publish from the `main` branch root. To attach a custom domain, add a `CNAME` file containing the domain and configure DNS at the registrar.
