// Overlay CMS coverage audit — paste into the browser console on a running build.
// Walks every rendered text node and reports whether it is covered by a data-edit-id.
// Run once per locale (click EL/EN between runs).
(() => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const covered = [];
  const uncovered = [];
  const seenIds = new Map();

  let n;
  while ((n = walker.nextNode())) {
    const text = n.textContent.replace(/\s+/g, ' ').trim();
    if (!text) continue; // whitespace-only formatting node
    const el = n.parentElement;
    if (!el || el.closest('script,style,noscript')) continue;

    const tagged = el.closest('[data-edit-id]');
    const rec = {
      text: text.length > 46 ? text.slice(0, 46) + '…' : text,
      el: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''),
    };
    if (tagged) {
      const id = tagged.getAttribute('data-edit-id');
      rec.id = id;
      seenIds.set(id, (seenIds.get(id) || 0) + 1);
      covered.push(rec);
    } else {
      uncovered.push(rec);
    }
  }

  // ids present in source but never rendered in this locale
  const idNodes = [...document.querySelectorAll('[data-edit-id]')];
  const imageIds = idNodes
    .filter((e) => e.getAttribute('data-edit-type') === 'image')
    .map((e) => ({ id: e.getAttribute('data-edit-id'), alt: e.alt }));

  console.log('locale:', document.documentElement.lang);
  console.log('text nodes found   :', covered.length + uncovered.length);
  console.log('covered by a tag   :', covered.length);
  console.log('UNCOVERED          :', uncovered.length);
  if (uncovered.length) console.table(uncovered);
  console.log('image alts tagged  :', imageIds.length);
  console.table(imageIds);
  console.log('distinct ids hit   :', seenIds.size);

  return {
    found: covered.length + uncovered.length,
    covered: covered.length,
    uncovered,
    imageAlts: imageIds.length,
  };
})();
