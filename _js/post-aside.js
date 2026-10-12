// Fills the panel beside an article (_includes/post-aside.html) from the top with as many of its items as fit in the
// article's height, which differs from one article to the next and changes as figures and boards load.

import { toArray } from './lib/dom.js';

export function installPostAside() {
  const aside = document.querySelector('.post-aside');
  if (!aside) return;
  const article = aside.closest('.post');
  const items = toArray(aside.querySelectorAll('.aside-item'));

  const fit = () => {
    items.forEach((item) => {
      item.hidden = false;
    });
    if (getComputedStyle(aside).display === 'none') return;
    const style = getComputedStyle(aside);
    const gap = parseFloat(style.rowGap) || 0;
    const room = aside.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    let used = 0;
    let full = false;
    for (const item of items) {
      const height = item.offsetHeight + (used ? gap : 0);
      if (full || used + height > room) {
        full = true;
        item.hidden = true;
      } else {
        used += height;
      }
    }
  };

  fit();
  // The panel is as tall as the article, so its height changes with it; the width decides whether it shows at all.
  new ResizeObserver(fit).observe(article);
  addEventListener('resize', fit);
}
