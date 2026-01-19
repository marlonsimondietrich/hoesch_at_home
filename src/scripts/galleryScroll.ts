import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const initGalleryScroll = () => {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) return;

  const section = document.querySelector<HTMLElement>('[data-gallery-section]');
  if (!section) return;

  gsap.registerPlugin(ScrollTrigger);

  const introItems = section.querySelectorAll<HTMLElement>('[data-gallery-intro]');
  const tiles = section.querySelectorAll<HTMLElement>('[data-gallery-tile]');

  gsap.set(tiles, { transformOrigin: '50% 60%' });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'bottom 40%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      },
    })
    .fromTo(
      introItems,
      { y: 36, opacity: 0, filter: 'blur(6px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.16,
        ease: 'power3.out',
        clearProps: 'filter',
      },
    )
    .fromTo(
      tiles,
      { y: 60, opacity: 0, scale: 0.9, rotate: -1.5, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'filter',
      },
      '-=0.25',
    );
};

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryScroll, { once: true });
  } else {
    initGalleryScroll();
  }
}
