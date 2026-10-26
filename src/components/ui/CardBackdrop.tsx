import Image from 'next/image';

export type PhotoScene = 'advisory' | 'home' | 'business';

export function financingScene(slug: string): PhotoScene {
  if (slug === 'home' || slug === 'property') return 'home';
  if (slug === 'personal' || slug === 'securities') return 'advisory';
  return 'business';
}

/** Decorative imagery: all meaningful card information stays in accessible HTML. */
export default function CardBackdrop({ scene, sizes = '(max-width: 540px) 100vw, (max-width: 1023px) 50vw, 33vw' }: { scene: PhotoScene; sizes?: string }) {
  return <span className="card-backdrop" aria-hidden="true">
    <Image src={`/images/enmac-${scene}.webp`} alt="" fill sizes={sizes} />
  </span>;
}
