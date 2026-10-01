# indusandivy.com

Plain HTML and CSS, hosted on Netlify. No build step, no frameworks. Anyone on the team can edit a page.

## Files

| File | What it is |
|------|------------|
| `index.html` | Home |
| `products.html` | Our Products (next to rebuild) |
| `story.html` | Our Story |
| `contact.html` | Contact Us + FAQs |
| `css/styles.css` | All styling. Brand colours and fonts are at the top in `:root`. |
| `css/chrome.css` | Header, tabs and footer styling (shared by every page) |
| `js/site.js` | Form sending |
| `js/chrome.js` | Mobile menu |
| `partials/` | The one copy of the header and footer |
| `assets/` | Logos and images |

## Common edits

- **Change text:** open the page's `.html` file, find the sentence, change it. Each section has a comment like `<!-- ===== 2. FEATURED PRODUCT ===== -->`.
- **Launch day:** edit the announcement bar at the top of every page, and swap "Launching soon" for the Amazon link (tag it with Amazon Attribution).
- **Placeholders** still to fill are marked with `class="todo"` (they show yellow). Search for `todo`.
- **Header (tabs) and footer** live in `partials/header.html` and `partials/footer.html`. Edit them there, then run `python3 tools/update-chrome.py` to copy them into every page. Their styling is in `css/chrome.css`. Every page shows the same tabs; the current one is underlined automatically.

## Forms

Forms use Netlify Forms (form names: `join`, later `contact`). Submissions appear in Netlify → the site → Forms. Turn on form detection there once.

## Copy rules (MoCRA / FDA)

Use: softens, conditions, moisturizes, smooths, nourishes, "for dry, cracked heels".
Never: heals, treats, repairs, prevents, cures. "Inspired by Ayurveda" is fine; "Ayurvedic remedy for…" is not.

## Going back to the old site

The site before the redesign is saved as the git tag `v1-original` and the branch `legacy-site`. Redesign work happens on the `redesign` branch and only goes live when merged into `main`.
