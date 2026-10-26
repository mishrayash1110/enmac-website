import Image from 'next/image';

export default function BrandLogo({ priority = false }: { priority?: boolean }) {
  return <Image className="enmac-logo" src="/branding/enmac-logo.jpg" alt="ENMAC" width={1600} height={899} priority={priority} sizes="160px" />;
}
