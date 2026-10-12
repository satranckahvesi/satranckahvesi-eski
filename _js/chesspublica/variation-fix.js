// In <pgn-player>, stepping inside a variation makes ChessPublica rebuild the
// comment box without the variation lists the reader just clicked into. This
// puts the live list nodes back (they keep their handlers and keep reflecting
// ChessPublica's updates), keeps one play button available, and makes
// switching between variations leave the previous one cleanly.

import { toArray } from '../lib/dom.js';
import { detachVariation, engineOf, variationOf } from './engine.js';

// Top-level variation blocks last seen on the mainline, per player.
const savedBlocks = new WeakMap();
// The mainline comment those blocks hang off, as a copy: ChessPublica drops it
// from the box inside a nested variation and fills it with variation text
// inside the first level.
const savedLines = new WeakMap();

const isBlock = (el) => el.classList?.contains('variation-block');

function ensurePlayButton(box) {
  let button = box.querySelector(':scope > .comment-play-btn');
  if (!button) {
    button = document.createElement('button');
    button.className = 'comment-play-btn';
    button.append(
      Object.assign(document.createElement('span'), {
        className: 'lucide-icon',
      }),
    );
    box.append(button);
  }
  // Always a plain play glyph, borrowed from the hidden per-variation icon:
  // ChessPublica's replay glyph at a variation's end is not what pressing it
  // does here.
  const icon = button.querySelector('.lucide-icon');
  const source = box.querySelector('.variation-icon');
  if (icon && source) icon.style.setProperty('--icon', source.style.getPropertyValue('--icon'));
  icon?.setAttribute('aria-label', 'Play');
}

function restore(player) {
  const engine = engineOf(player);
  const box = player.querySelector('.video-comment');
  if (!engine || !box) return;
  const variation = variationOf(engine);

  if (!variation) {
    box.classList.remove('cp-in-variation');
    box.querySelector(':scope > .comment-line')?.classList.remove('cp-duplicate');
    const blocks = toArray(box.children).filter(isBlock);
    savedBlocks.set(player, blocks.length ? blocks : null);
    const line = box.querySelector(':scope > .comment-line');
    savedLines.set(player, line ? line.cloneNode(true) : null);
    return;
  }

  box.classList.add('cp-in-variation');
  const saved = savedBlocks.get(player);
  const content = variation.contentEl;
  if (saved && content && saved.some((block) => block.contains(content))) {
    const present = toArray(box.children).filter(isBlock);
    const intact = present.length === saved.length && saved.every((block, i) => present[i] === block);
    if (!intact) {
      present.forEach((block) => block.remove());
      saved.forEach((block) => box.append(block));
    }
  } else if (content && !box.contains(content)) {
    box.append(content);
  }
  restoreLine(player, box);
  syncActiveMove(box, variation);
  hideDuplicateComment(box);
  ensurePlayButton(box);
}

// ChessPublica counts every move of the variation text, nested variations included, to find the move to highlight,
// so after a nested variation it marks a move too early. The variation's own moves (not those of nested lists) are
// what its index counts; highlight the one at that index.
function syncActiveMove(box, variation) {
  const content = variation.contentEl;
  if (!content || !(variation.index >= 1)) return;
  const own = toArray(content.querySelectorAll('.var-move')).filter((m) => m.closest('.variation-content') === content);
  const target = own[variation.index - 1];
  if (!target) return;
  box.querySelectorAll('.var-move.active').forEach((m) => m !== target && m.classList.remove('active'));
  if (!target.classList.contains('active')) target.classList.add('active');
}

const textOf = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();

// Inside a variation ChessPublica shows the active move's comment twice: as the comment line above the variation and
// inline in the variation's own text, right after the move. The inline one stays (it is part of the variation); the
// line is hidden when it only repeats it. A line with a different text (the mainline comment the variation hangs off)
// stays.
function hideDuplicateComment(box) {
  const line = box.querySelector(':scope > .comment-line');
  if (!line) return;
  const inline = box.querySelector('.var-move.active')?.nextElementSibling;
  const duplicate = Boolean(inline?.classList.contains('variation-comment')) && textOf(inline) === textOf(line);
  line.classList.toggle('cp-duplicate', duplicate);
}

// Keeps the mainline comment ahead of the variations it introduces.
function restoreLine(player, box) {
  const line = savedLines.get(player);
  if (!line) return;
  const present = toArray(box.children).filter((el) => el.classList.contains('comment-line'));
  if (present.length === 1 && present[0].dataset.cpSaved) return;
  present.forEach((el) => el.remove());
  const copy = line.cloneNode(true);
  copy.dataset.cpSaved = '1';
  box.prepend(copy);
}

// Capture phase: runs ahead of ChessPublica's own handlers.
function onClick(player, event) {
  const engine = engineOf(player);
  const variation = variationOf(engine);
  const target = event.target;
  if (!target?.closest) return;

  // Play from inside a variation: back to the mainline position it branched
  // from, and carry on from there.
  if (variation && target.closest('.comment-play-btn')) {
    event.stopPropagation();
    event.preventDefault();
    const index = variation.mainStateIndex;
    engine.exitVariation();
    engine.goTo(index);
    engine.play();
    return;
  }

  // A move in a different variation than the current one: leave the current
  // one first so ChessPublica does not stack it as a parent, and so only one
  // move stays highlighted. A move in a variation nested inside the current
  // one is a real parent/child step and is left alone.
  const move = target.closest('.var-move');
  if (!move) return;
  if (variation?.contentEl) {
    const list = move.closest('.variation-content');
    const same = list === variation.contentEl;
    const nested = !same && variation.contentEl.contains(list);
    // Moving within the same list keeps the variation it hangs off: exiting would forget that parent, and entering
    // while still inside would stack the list on itself.
    if (same) detachVariation(engine);
    else if (!nested) engine.exitVariation();
  }
  const box = player.querySelector('.video-comment');
  box?.querySelectorAll('.var-move.active').forEach((m) => m.classList.remove('active'));
}

// Space plays on from where the reader is: one move at a time, through the variation, back into the line it branched
// from (the parent variation, then the mainline), until the end or until the reader acts. ChessPublica's own autoplay
// is removed on this site, so this is a plain timer over single steps.
const STEP_MS = 1100;
const timers = new WeakMap();

function stepForward(player) {
  const engine = engineOf(player);
  const variation = variationOf(engine);
  if (variation) {
    if (variation.index < variation.fens.length - 1) {
      engine.variationGoTo(variation.index + 1);
    } else if (engine.exitToParentVariation()) {
      const parent = variationOf(engine);
      engine.variationGoTo(Math.min(parent.index + 1, parent.fens.length - 1));
    } else {
      const main = variation.mainStateIndex;
      engine.exitVariation();
      engine.goTo(main + 1);
    }
    return true;
  }
  const before = engine.state.index;
  engine.goTo(before + 1);
  return engine.state.index !== before;
}

const isPlaying = (player) => timers.has(player);

function stopPlaying(player) {
  clearInterval(timers.get(player));
  timers.delete(player);
}

function startPlaying(player) {
  if (!stepForward(player)) return;
  timers.set(
    player,
    setInterval(() => {
      if (!stepForward(player)) stopPlaying(player);
    }, STEP_MS),
  );
}

const isTyping = (el) => el && (['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(el.tagName) || el.isContentEditable);

export function installVariationFix(body, watcher) {
  const players = toArray(body.querySelectorAll('pgn-player'));
  let active = null;
  players.forEach((player) => {
    watcher.subscribe(() => restore(player), { scope: player });
    player.addEventListener('click', (event) => onClick(player, event), true);
    if (player.closest('pgn-study')) return;
    const mark = () => {
      active = player;
    };
    player.addEventListener('mouseenter', mark);
    player.addEventListener('click', mark);
    player.addEventListener('touchstart', mark, { passive: true });
    // Any click, touch or other key by the reader takes over from the autoplay.
    for (const type of ['click', 'touchstart']) {
      player.addEventListener(type, (event) => event.isTrusted && stopPlaying(player), true);
    }
  });

  document.addEventListener(
    'keydown',
    (event) => {
      if (!event.isTrusted || !active) return;
      if (event.code !== 'Space') {
        if (isPlaying(active) && !isTyping(document.activeElement)) stopPlaying(active);
        return;
      }
      if (isTyping(document.activeElement)) return;
      // Plays on from inside a variation or while already playing; on the mainline Space keeps its usual behavior.
      if (!isPlaying(active) && !variationOf(engineOf(active))) return;
      // Also keeps ChessPublica's own Space handler (a second step) and page scrolling out of it.
      event.preventDefault();
      event.stopImmediatePropagation();
      if (isPlaying(active)) stopPlaying(active);
      else startPlaying(active);
    },
    true,
  );
}
