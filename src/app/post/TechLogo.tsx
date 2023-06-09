import styles from './page.module.css';
import Image from 'next/image';

export default function TechLogo({ tech }: { tech: string }) {
  const renamed = (name: string) =>
    name
      .toLowerCase()
      .replace(/ /g, '')
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/g, '');

  return (
    <>
      <div
        className={`${styles.techIconWrapper} tooltip`}
        aria-label={tech}
        // aria-label={tech}
      >
        <Image
          src={`/techIcon/${renamed(tech)}.svg`}
          alt={tech}
          width={30}
          height={30}
          className="no-drag"
        />
      </div>
    </>
  );
}
