# indusandivy.com

Plain HTML, CSS and JS, hosted on Netlify. No build step, no frameworks.

## Files

| File | What it is |
|------|------------|
| `index.html` | Home |
| `kokum-butter-balm.html` | Kokum Butter Balm product page (Shop) |
| `moringa-body-oil-mist.html` | Moringa Body Oil Mist, coming soon (Shop) |
| `ingredients.html` | Every ingredient explained |
| `story.html` | Our Story |
| `contact.html` | Contact form + FAQs |
| `privacy.html`, `thanks.html`, `404.html` | Utility pages |
| `css/styles.css` | All styling. Brand colours and fonts are at the top in `:root`. |
| `js/main.js` | Header, Shop dropdown, mobile menu, Join pop-up, scroll animations, gallery, melt slider, form sending |
| `partials/` | The one copy of the header, footer and Join pop-up |
| `tools/update-chrome.py` | Copies the header/footer into every page |
| `assets/` | Logos and icons |
| `images/` | Website photography (see below) |
| `sitemap.xml`, `robots.txt` | For Google. Add new pages to `sitemap.xml`. |

## Join the list pop-up

Lives in `partials/footer.html` (Netlify form `join`). Any button with `data-join` opens it.
Add `data-interest="Moringa Body Oil Mist"` to pre-tick a product. It also opens once per visitor
after 20 seconds or halfway down a page. Add `data-no-popup` to a page's `<body>` to stop the automatic opening there.

## Images

All photography lives in `images/` with these exact names. Export them from the Canva design
**"Indus & Ivy Website Image Kit"** (Share > Download > JPG > All pages). Canva saves pages as
numbered files; rename them as below.

| Canva page | File name | Size | Used on |
|-----------|-----------|------|---------|
| 1 | `hero-desktop.jpg` | 1920 x 1080 | Home hero (desktop) |
| 2 | `hero-mobile.jpg` | 1080 x 1920 | Home hero (phones) |
| 3 | `hero-light.jpg` | 1920 x 1080 | Join section, Story closing, product gallery |
| 4 | `balm-product.jpg` | 1080 x 1350 | Product shot |
| 5 | `balm-open.jpg` | 1080 x 1080 | Open jar |
| 6 | `balm-texture.jpg` | 1920 x 1080 | Texture banner |
| 7 | `ingredient-kokum.jpg` | 1080 x 1350 | Kokum card, Story hero |
| 8 | `ingredient-cinnamon.jpg` | 1080 x 1350 | Cinnamon card |
| 9 | `ritual-heel.jpg` | 1620 x 1080 | Ritual section |
| 10 | `moringa-teaser.jpg` | 1080 x 1350 | Moringa coming soon |
| 11 | `balm-box.jpg` | 1080 x 1350 | Product gallery (jar with box) |

To swap an image later, replace the file and keep the same name.
Keep each JPG under about 400 KB (Canva quality 80 is fine).

The product images are AI renders that carry the real jar label (logo, product name, net weight),
based on the strip label design. Replace them with real product photos once stock arrives.

### Switching the home hero to video
In `index.html`, section 1, replace the `<picture>` block with the `<video>` line in the comment above it,
and add `images/hero.mp4` (8 to 10 seconds, muted, under 4 MB).

## Common edits

- **Change text:** open the page's `.html` file, find the sentence, change it. Each section has a comment like `<!-- ============ 4. FEATURED PRODUCT ============ -->`.
- **Header and footer:** edit `partials/header.html` or `partials/footer.html`, then run `python3 tools/update-chrome.py`.
- **Launch day:** update the announcement bar in `partials/header.html`, and swap the "Get launch-day access" button on `kokum-butter-balm.html` for the Amazon link (tag it with Amazon Attribution).

## Forms

Netlify Forms: `join` (pop-up, every page) and `contact`. Submissions appear in Netlify > the site > Forms.

## Copy rules (MoCRA / FDA)

Use: softens, conditions, moisturizes, smooths, nourishes, "for dry, cracked heels".
Never: heals, treats, repairs, prevents, cures, "clinically tested" (until it is). "Inspired by Ayurveda" is fine; "Ayurvedic remedy for..." is not.

## Publishing

Work on the `redesign` branch and preview first. Pushing to `main` publishes: Netlify deploys indusandivy.com automatically.
