# Martina Dimoska — personal website

A complete, responsive personal portfolio, designed for GitHub Pages. Plain HTML, CSS, and JavaScript; no npm dependencies, framework, backend, API keys, or build step. Photographs and fonts are self-hosted.

## Preview locally

With Node.js 18 or newer installed:

```sh
npm start
```

Open **http://127.0.0.1:4173**. Stop the server with Ctrl+C.

You can also open `index.html` directly to view the website; HTTP preview is preferred for checking font loading and downloads.

## Publish on GitHub Pages

1. Create a GitHub repository. Use `YOUR-USERNAME.github.io` for a personal root site, or any repository name for a project site. If using GitHub Free, use a public repository.
2. Upload these project files, including `.github/workflows/pages.yml` and `.nojekyll`, to its **main** branch. If your branch has a different name, edit the branch setting in the workflow.
3. Open the repository’s **Settings → Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open **Actions → Publish personal website → Run workflow** if the first push already happened before enabling Pages. Future pushes to main deploy automatically.
5. The successful deployment shows the public website URL in the `github-pages` environment and in **Settings → Pages**.

The workflow verifies local links/assets, stages only the public website files, and deploys them using GitHub’s official Pages actions. It does not publish the research HTML, original large JPEGs, preview tools, or QA captures.

### Alternative: publish from a branch

For the simplest manual setup, omit `.github/workflows/pages.yml`, upload the website files, and select **Settings → Pages → Deploy from a branch → main → / (root)**. The site does not require a build. Keep `index.html`, `styles.css`, `script.js`, `SOURCES.md`, `.nojekyll`, and `assets/` together.

Relative asset paths work both at `https://YOUR-USERNAME.github.io/` and at `https://YOUR-USERNAME.github.io/REPOSITORY/`. There are no application routes to configure.

## Set the final website URL

Once you know the exact public URL, run:

```sh
node scripts/configure-url.mjs https://YOUR-USERNAME.github.io/REPOSITORY/
```

Replace the example with your actual URL (including the repository path for a project site). This adds the canonical URL, absolute social image URL, structured data URL, and `sitemap.xml`/`robots.txt`. Commit the resulting files. If you later add a custom domain, rerun with that domain’s HTTPS URL.

## Edit content

- **Biography, education, missions, awards, media, and contact:** edit `index.html`.
- **Colors, spacing, typography, responsive layouts:** edit `styles.css`. Color variables are near the top.
- **Tabs, mobile navigation, media filters, credits dialog:** edit `script.js`.
- **Downloadable biography:** edit `assets/martina-dimoska-press-kit.txt`.
- **Photo credits and fact sources:** maintain `SOURCES.md` and the credits dialog in `index.html`.
- **Contact address:** search for `martina@internationalspacealliance.com`; keep the HTML, structured data, and press bio consistent when changing it.

The ISU entry currently says “Master’s studies”; public sources vary in how they describe completion. Change the wording to the exact awarded qualification if applicable.

## Included behavior

- Responsive layouts for desktop, tablet, and mobile.
- Keyboard-operable mission tabs (arrow keys, Home, End).
- Media filters with screen-reader announcements.
- Mobile menu with Escape handling and automatic close on navigation.
- Accessible source/credit dialog with native focus trapping and Escape dismissal.
- Email contact links, LinkedIn, original media sources, and a downloadable press biography.
- Reduced-motion support, skip navigation, visible focus, image descriptions, and a print layout that exposes all missions.
- All mission content and media remain available when JavaScript is disabled.
- Descriptive metadata, Person structured data, social image, favicon, and optional URL-specific sitemap.
- No analytics, cookies, trackers, embedded social feeds, or third-party runtime dependencies.

## Check files

```sh
npm run check
```

This checks JavaScript syntax, local file links, anchor targets, image attributes, ARIA references, structured data, and project-site-compatible asset paths. It does not validate changing content on external websites.

See `SOURCES.md` for the factual research and photograph licenses. Retain the Amrit Karki attribution and CC BY-SA 4.0 license when distributing the analog portrait or its adaptations. NASA references describe personal professional experience and do not imply institutional endorsement.
