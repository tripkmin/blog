import { renamed } from '@/utils/util';
import Image from 'next/image';

export default function TechLogo({ tech }: { tech: string }) {
  return (
    <Image
      src={`/techIcon/${renamed(tech)}.svg`}
      alt={tech}
      width={30}
      height={30}
      className="no-drag"
    />
  );
}
