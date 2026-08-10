# TrueTail Landing Site

Single-page landing site for TrueTail natural dog and cat treats. Plain HTML/CSS/JS, no frameworks, no build step.

**Real Ingredients. True Love.**

## Structure

- `index.html` - all sections (nav, hero, treats, promise, story, footer, cart drawer)
- `style.css` - brand styling (forest green `#3E4A2B`, cream `#EDE4D0`, brown `#3B2A1E`, gold `#C6A15B`)
- `script.js` - product cards, cart with localStorage, WhatsApp checkout
- `images/` - brand imagery and crops

## Editing products

Open `script.js`. Product names, descriptions and photos are in `PRODUCTS`. The WhatsApp number is in `WHATSAPP_NUMBER` (international format, no +).

Sizes and prices are not on the site yet. The cards show a "Sizes & pricing coming soon" pill, and the cart sends a WhatsApp message asking for sizes and prices. When the real pricing is ready, that is the part to replace.

## Run locally

```
python3 -m http.server 8123
```

Then open http://localhost:8123

## Deploy

Live at https://truetail.co (GitHub Pages, repo `Moesb1/truetail`, branch `main`, root folder).

To publish a change:

```
git add -A && git commit -m "your message" && git push
```

Pages rebuilds within a minute.

The `CNAME` file holds the custom domain. Do not delete it: GitHub reads it on every build, and removing it unsets the domain.

### DNS records for truetail.co

Apex `truetail.co` needs four A records pointing at GitHub Pages:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

And `www` as a CNAME to `moesb1.github.io`.
