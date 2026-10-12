// Below 52em the header links sit behind a hamburger button. The button ships
// hidden and the links ship visible, so without JavaScript nothing is lost.
export function installNavMenu() {
  const nav = document.querySelector('.site-nav');
  const button = nav?.querySelector('.menu-toggle');
  const menu = nav?.querySelector('.nav-links');
  if (!button || !menu) return;

  const set = (open) => {
    nav.toggleAttribute('data-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  };

  nav.setAttribute('data-menu', '');
  button.hidden = false;
  set(false);

  button.addEventListener('click', () => {
    const open = !nav.hasAttribute('data-open');
    set(open);
    if (open) menu.querySelector('a')?.focus({ preventScroll: true });
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) set(false);
  });
  // pointerdown rather than click: iOS Safari sends no click for a tap on an element that is not interactive, which
  // is most of the page.
  document.addEventListener('pointerdown', (event) => {
    if (!nav.contains(event.target)) set(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !nav.hasAttribute('data-open')) return;
    set(false);
    button.focus();
  });
}
