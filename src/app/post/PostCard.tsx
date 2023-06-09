import { Post } from 'contentlayer/generated';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { CalendarIcon, TimerIcon } from '@/styles/svgIcons';

export default function PostCard(post: Post) {
  const formattedDate = dayjs(post.date).format('YYYY-MM-DD');
  const renamed = (name: string) =>
    name
      .toLowerCase()
      .replace(/ /g, '')
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/g, '');

  return (
    <div className={styles.postWrapper}>
      <div className={styles.postLeft}>
        <div>
          {post.series ? (
            <span className={`${styles.seriesBadge} ${styles.badge}`}>{post.series}</span>
          ) : undefined}
          {post.tags
            ? post.tags.map((tag, idx) => (
                <span key={idx} className={`${styles.tagBadge} ${styles.badge}`}>
                  {tag}
                </span>
              ))
            : undefined}
        </div>
        <div>
          <h4>
            <Link href={post.url}>{post.title}</Link>
          </h4>
        </div>
        <div className={styles.infoBox}>
          <div>
            <CalendarIcon width={10} style={{ marginRight: '5px' }} />
            <span className="small-info">{formattedDate}</span>
            <TimerIcon width={10} style={{ marginRight: '5px' }} />
            <span className="small-info">{post.readTimeMinutes}분</span>
          </div>
        </div>
      </div>
      <div className={styles.postRight}>
        {post.techs
          ? post.techs.map((tech, idx) => {
              return (
                <div
                  key={idx}
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
              );
            })
          : undefined}
      </div>
    </div>
  );
}

{
  /* <span key={idx} className={`${styles.techBadge} ${styles.badge}`}>
{tech}
</span> */
}
