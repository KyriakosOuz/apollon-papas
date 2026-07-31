import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import i18n from '../i18n';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function fmtStat(n: number): string {
  return n.toLocaleString(i18n.language === 'el' ? 'el-GR' : 'en-US');
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Page-level scroll machinery: Lenis smooth scroll, section reveals, stat
// count-ups, aurora parallax, journey spine draw + dot lighting, smooth
// anchor navigation. Everything is skipped under reduced motion; the page
// is fully readable without it.
export function useScrollMotion(): void {
  const lenisRef = useRef<Lenis | null>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis();
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const rafCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCb);
    gsap.ticker.lagSmoothing(0);

    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
      const target = parseFloat(el.dataset.count || '0');
      const suffix = el.dataset.suffix || '';
      ScrollTrigger.create({
        trigger: el,
        start: 'top 86%',
        once: true,
        onEnter: () => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.4,
            ease: 'power1.out',
            onUpdate: () => {
              el.textContent = fmtStat(Math.round(obj.v)) + suffix;
            },
          });
        },
      });
    });

    // Aurora parallax: gentle upward drift as the hero scrolls away (no fade,
    // the glow stays vivid until it naturally leaves the viewport)
    gsap.to('.hero .js-aurora', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    // Journey spine draws down as you scroll through the timeline
    const spine = document.querySelector('.js-journey-progress');
    if (spine) {
      gsap.fromTo(
        spine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.journey-list', start: 'top 72%', end: 'bottom 55%', scrub: 0.4 },
        }
      );
    }

    // Journey dots light gold as the spine reaches them
    gsap.utils.toArray<HTMLElement>('.journey-item').forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 68%',
        onEnter: () => item.classList.add('lit'),
        onLeaveBack: () => item.classList.remove('lit'),
      });
    });

    // Program stack: each card fades out as the next one scrolls up over it,
    // so only the card you are reading is ever visible.
    //
    // Opacity is written straight from measured geometry rather than through a
    // scrubbed tween per card. ScrollTrigger resolves start/end against an
    // element's normal-flow position, which a position:sticky card does not
    // keep, so per-card triggers fire at the wrong scroll offsets.
    // Mirrors the max-width in the stack's CSS block. Below it the cards are
    // static and there is nothing to fade.
    const stackable = window.matchMedia('(min-width: 861px)');

    const pinOf = (el: HTMLElement) => parseFloat(getComputedStyle(el).top) || 0;

    const updateStacks = () => {
      // Re-queried every frame rather than captured once: React can swap these
      // nodes on a re-render, and a held reference then styles detached
      // elements while the live cards keep their original opacity.
      document.querySelectorAll<HTMLElement>('.products-grid--stack').forEach((grid) => {
        const cards = Array.from(grid.children) as HTMLElement[];
        if (cards.length < 2) return;

        cards.forEach((card, i) => {
          const next = cards[i + 1];
          // The last card has nothing riding over it.
          if (!next) return;
          if (!stackable.matches) {
            card.style.opacity = '';
            return;
          }

          const pin = pinOf(card);
          const top = card.getBoundingClientRect().top;
          // At the end of the section the stack releases and the cards travel
          // up together, which would grow `exposed` again and fade them back
          // in. Anything already above its own pin has been passed for good.
          if (top < pin - 1) {
            card.style.opacity = '0';
            return;
          }

          // How much of this card is still uncovered, and the sliver it is
          // left with once the next card settles onto its pin.
          const exposed = next.getBoundingClientRect().top - top;
          const sliver = pinOf(next) - pin;
          // Fade across the second half of being covered, so a card holds full
          // opacity until the next one is genuinely on top of it, and lands on
          // exactly 0 rather than leaving a faint ghost behind.
          const fadeOver = card.offsetHeight * 0.5;
          const progress = gsap.utils.clamp(0, 1, (fadeOver - exposed) / Math.max(1, fadeOver - sliver));
          card.style.opacity = String(1 - progress);
        });
      });
    };

    // Its own frame loop rather than a ScrollTrigger callback or the GSAP
    // ticker: the values come from live rects, so this stays correct no matter
    // what moved the page (wheel, Lenis, anchor jump, resize, programmatic
    // scroll).
    let stackFrame = requestAnimationFrame(function loop() {
      updateStacks();
      stackFrame = requestAnimationFrame(loop);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(rafCb);
      cancelAnimationFrame(stackFrame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Smooth anchor navigation without scrollIntoView
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href')?.slice(1);
      if (!id) {
        e.preventDefault();
        return;
      }
      const dest = document.getElementById(id);
      if (!dest) return;
      e.preventDefault();
      const y = dest.getBoundingClientRect().top + window.scrollY - 72;
      if (lenisRef.current) lenisRef.current.scrollTo(y);
      else window.scrollTo({ top: y, behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
