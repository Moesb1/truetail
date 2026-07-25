# TrueTail Landing Site

Single-page landing site for TrueTail natural dog and cat treats. Plain HTML/CSS/JS, no frameworks, no build step.

**Real Ingredients. True Love.**

## Structure

- `index.html` - all sections (nav, hero, treats, promise, story, footer, cart drawer)
- `style.css` - brand styling (forest green `#3E4A2B`, cream `#EDE4D0`, brown `#3B2A1E`, gold `#C6A15B`)
- `script.js` - product cards, cart with localStorage, WhatsApp checkout
- `images/` - brand imagery and crops

## Editing prices and products

Open `script.js`. Prices per size are at the top in `SIZE_PRICES`; product names, descriptions and photos are in `PRODUCTS`. The WhatsApp number is in `WHATSAPP_NUMBER` (international format, no +).

## Run locally

```
python3 -m http.server 8123
```

Then open http://localhost:8123

## Deploy to GitHub Pages (moesb1)

1. Create an empty repo named `truetail` on github.com/moesb1 (public).
2. From this folder:

```
git remote add origin https://github.com/moesb1/truetail.git
git push -u origin main
```

3. On GitHub: repo Settings, then Pages, then Source: "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. Site goes live at https://moesb1.github.io/truetail/ within a minute or two.

To point `truetail.co` at it later: add the domain in the same Pages settings screen and create a CNAME record at your DNS host pointing to `moesb1.github.io`.
