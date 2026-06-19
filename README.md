# assomena

Static snapshot of [assomena.org](https://assomena.org/) served from the `site/` directory.

This is a static mirror (HTML, CSS, JS, images, fonts) of the AssoMENA site, captured for local/offline use and static hosting. Interactive features that depend on the live backend API (login, registration, live directory data, contact forms) are not functional in this snapshot.

## Local preview

```bash
cd site
python3 -m http.server 8099
```

Then open <http://localhost:8099/>.

## Deployment

Hosted on Vercel as a static site. Configuration in [`vercel.json`](vercel.json) points the output directory at `site/`.
