"""Copy partials/header.html and partials/footer.html into every page.

Edit the header or footer ONCE in partials/, then run:
    python3 tools/update-chrome.py
Each page marks the spots with <!-- II:HEADER --> ... <!-- /II:HEADER --> and the same for FOOTER.
The current page's tab is highlighted automatically.
"""
import pathlib, re
root = pathlib.Path(__file__).resolve().parent.parent
header = (root / 'partials/header.html').read_text().strip()
footer = (root / 'partials/footer.html').read_text().strip()
for page in sorted(root.glob('*.html')):
    html = page.read_text()
    if '<!-- II:HEADER -->' not in html:
        continue
    h = header.replace(f'<a href="{page.name}">', f'<a href="{page.name}" aria-current="page">', 1)
    html = re.sub(r'<!-- II:HEADER -->.*?<!-- /II:HEADER -->', lambda m: f'<!-- II:HEADER -->\n{h}\n<!-- /II:HEADER -->', html, flags=re.S)
    html = re.sub(r'<!-- II:FOOTER -->.*?<!-- /II:FOOTER -->', lambda m: f'<!-- II:FOOTER -->\n{footer}\n<!-- /II:FOOTER -->', html, flags=re.S)
    page.write_text(html)
    print('updated', page.name)
