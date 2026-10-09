# Chetan & Monika: wedding invitation

One static page. No build step, no framework.

| File | What it is |
| --- | --- |
| `index.html` | The page. All the text is written here in **English** (this is what shows if anything else fails). |
| `data/content.json` | The same text in **Marathi, English and Hindi**. |
| `style.css` | Colours, fonts, layout, door animation. |
| `script.js` | Doors, countdown, scroll fade, and swapping in the languages. |
| `images/`, `fonts/` | Artwork and fonts. |

## How the languages work
Each piece of text in `index.html` has a `data-i18n="key"` label, for example
`<h3 data-i18n="weddingTitle">Wedding</h3>`. `script.js` loads `data/content.json`
and replaces the text with the one stored under that key (`text` > `mr` / `en` / `hi` > `weddingTitle`).
It starts with Marathi, then English, then Hindi, 10 seconds each. If the JSON cannot be
loaded (or a key is missing) the English text in `index.html` simply stays.

## Common edits
- **Change a sentence, date, time or venue:** edit it in `data/content.json` for all three languages, and the English copy in `index.html` too.
- **Wedding date for the countdown:** `weddingDate` in `data/content.json` (and `data-date` on `#countdown` in `index.html`). `19:30` means 7:30 PM.
- **Seconds per language / order:** `secondsPerLanguage` and `languages` in `data/content.json`.
- **Google Maps links:** the `href` of the "View on Google Maps" buttons in `index.html`.
- **Add or remove an event:** copy or delete a whole `<article class="card reveal">` block in `index.html`; for a new one, add its four keys (`...Date`, `...Title`, `...Time`, `...Venue`) to each language in the JSON.
- **Page title and link preview:** the `<title>` and `<meta>` lines at the top of `index.html` (WhatsApp does not run JavaScript, so these are not read from the JSON).

## Run it on your computer
`python3 -m http.server`, then open http://localhost:8000. Opening `index.html` by double-click also works, but only shows English (browsers block reading the JSON from a file).

## Deploy
Netlify (connect the repo, no build command, publish directory `/`) or GitHub Pages (branch `main`, folder `/`).
