# Chetan & Monika: wedding invitation

Static site (HTML, CSS, JS). No build step.

| Link | Who it is for | Events shown |
| --- | --- | --- |
| `/main` | close family and friends | Haldi, Sangeet, Wedding, Reception |
| `/guest` | all other guests (also the root `/`) | Wedding, Reception |

## Editing the content

Everything shown on the pages lives in one file: **`data/content.json`** (Marathi, English, Hindi).

- `events`: title, date, time, venue and map link of each event, per language
- `pages`: which events appear on `/main` and `/guest`, and in what order
- `weddingISO`: date and time used by the countdown
- `rsvpPhone`: WhatsApp number with country code, e.g. `919876543210` (RSVP button appears only when set)
- `ui`: headings, invitation text and other labels
- `order` / `rotateMs`: language order and seconds between switches (10000 = 10 s)

Keep the JSON valid (quotes, commas). After editing, commit and the host redeploys; no code change is needed.

Notes:
- The page reads the JSON with `fetch`, so open it through a web server (a host, or `python3 -m http.server`), not by double-clicking the HTML.
- The `<title>`, link-preview meta tags and the no-JavaScript text inside `main/index.html` and `guest/index.html` are static; edit them there if names or dates change.

## Behaviour
Languages rotate Marathi, English, Hindi every 10 seconds; the doors open on tap or after 5 seconds.

## Deploy
Drag this folder onto Netlify Drop, or connect the repo to Netlify, Cloudflare Pages or GitHub Pages.
