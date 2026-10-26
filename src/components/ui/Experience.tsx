'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

/** Progressive enhancement: content is always visible, even without JavaScript. */
export default function Experience() {
  const pathname = usePathname();
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.site-header');
    const updateHeader = () => { const next = String(window.scrollY > 48); if (header && header.dataset.scrolled !== next) header.dataset.scrolled = next; };
    updateHeader();
    window.addEventListener('scroll', updateHeader, {passive: true});

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    if (!reduced.matches && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) {
          entry.target.classList.add('experience-revealed');
          observer?.unobserve(entry.target);
        }
      }, {threshold: 0.12});
      document.querySelectorAll('.section-intro, .why-editorial-image, .feature-split, .corporate-panel, .cta-panel').forEach(node => observer?.observe(node));
    }
    return () => { observer?.disconnect(); window.removeEventListener('scroll', updateHeader); };
  }, [pathname]);
  return null;
}
