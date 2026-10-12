// Fills the panel beside an article (_includes/post-aside.html) from the top with as many of its items as fit in the
// article's height, which differs from one article to the next and changes as figures and boards load. The panel
// sticks while the page scrolls, unless what it shows is taller than the viewport.

import { toArray } from './lib/dom.js';

export function installPostAside() {
  const aside = document.querySelector('.post-aside');
  if (!aside) return;
  const article = aside.closest('.post');
  const inner = aside.querySelector('.aside-inner');
  const items = toArray(inner.querySelectorAll('.aside-item'));

  const fit = () => {
    items.forEach((item) => {
      item.hidden = false;
    });
    if (getComputedStyle(aside).display === 'none') return;
    inner.classList.remove('is-tall');
    const gap = parseFloat(getComputedStyle(inner).rowGap) || 0;
    const asideStyle = getComputedStyle(aside);
    const room = aside.clientHeight - parseFloat(asideStyle.paddingTop) - parseFloat(asideStyle.paddingBottom);
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
    inner.classList.toggle(
      'is-tall',
      used > innerHeight - 2 * parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  };

  fit();
  // The panel is as tall as the article, so its height changes with it; the width decides whether it shows at all.
  const observer = new ResizeObserver(fit);
  observer.observe(article);
  addEventListener('resize', fit);
}
