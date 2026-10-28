# Verification — 28 October 2026

## Passed

- `npm run check`: JavaScript syntax, all local asset references, internal navigation anchors, unique HTML IDs, tab/panel relationships, image descriptions and intrinsic dimensions, JSON-LD parsing, and relative paths for GitHub project Pages.
- Preview server returned HTTP 200 for the home page.
- Browser verification confirmed both photographs loaded and the self-hosted display font was available.
- Desktop layout reviewed in a 1280-pixel browser viewport and a 1440-pixel iframe; tablet layout reviewed in the visible preview panel.
- Mobile layout visually reviewed in 390-pixel and 320-pixel iframes.
- Mission selection verified for all four missions; ArrowRight and End keyboard navigation changed selected panels correctly.
- All, Watch, Listen, and Read filters showed the expected 4, 1, 1, and 2 media items, with live announcements.
- Sources/credits dialog opened with focus on its close button; Escape dismissed it and restored the document.
- Mobile navigation opened and closed after choosing a section.
- Without JavaScript (sandboxed iframe), all four mission articles, navigation, and source-credit links remained available.
- URL configuration checked for a GitHub project-site path, absolute social image, repeated runs without duplicate canonical tags, and rejection of an insecure URL.
- Email links and press-bio download reference the supplied public address and included local file.

## Scope and limitations

The website is ready for GitHub Pages but has not been uploaded to a GitHub account or publicly deployed. The automated Pages workflow is based on GitHub’s official static-site workflow; an actual Actions run requires the destination repository and Pages setting.

The responsive checks use a desktop browser and fixed-width iframes, not physical mobile devices. Screen-reader structure and keyboard interactions were inspected; no formal accessibility audit or assistive-device certification is claimed.

Content is based on the public sources in SOURCES.md. Some external services block automated retrieval or return intermittent errors. Their original URLs remain linked; source availability may change independently of this site. The final canonical/social URL must be configured once the GitHub Pages address is known.

The local QA harnesses and screenshots are excluded from the deployment workflow and release archive.
