import Image from 'next/image';

// Reuse the existing editorial assets in place of decorative financial dashboards.
export default function FinancialArt({ variant = 'hero' }: { variant?: 'hero' | 'business' | 'home' | 'growth' }) {
  const scene = variant === 'home' ? 'home' : variant === 'business' || variant === 'growth' ? 'business' : 'advisory';
  const title = variant === 'business' ? 'Build what’s next.' : variant === 'home' ? 'Make room for home.' : 'Find your next step.';

  return <div className={`financial-art editorial-photo art-${variant}`}>
    <Image src={`/images/enmac-${scene}.webp`} alt={scene === 'home' ? 'Illustrative residential interior' : scene === 'business' ? 'Illustrative business workspace' : 'Illustrative financial planning conversation'} fill sizes="(max-width: 767px) 100vw, 45vw" />
    <div className="editorial-photo-caption">
      <span className="micro-label">YOUR FINANCIAL PATH</span>
      <strong>{title}</strong>
      <p>Explore • Understand • Plan</p>
      <small>Clarity at every step · Guidance before decisions</small>
    </div>
  </div>;
}
