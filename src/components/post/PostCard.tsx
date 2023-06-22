import { Post } from 'contentlayer/generated';
import Link from 'next/link';
import styles from '@/styles/Post.module.css';
import { CalendarIcon, TimerIcon } from '@/styles/svgIcons';
import { formattedDate } from '@/utils/util';
import TechLogo from './TechLogo';

export default function PostCard(post: Post) {
  return (
    <Link href={`/post/${post.url}`}>
      <div className={styles.postWrapper}>
        <div className={styles.postLeft}>
          <div>
            {post.series ? (
              <span className={`${styles.seriesBadge} ${styles.badge}`}>
                {post.series}
              </span>
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
            <h4>{post.title}</h4>
          </div>
          <div className={styles.infoBox}>
            <div>
              <CalendarIcon width={10} style={{ marginRight: '5px' }} />
              <span className="small-info">{formattedDate(post.date)}</span>
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
                    aria-label={tech}>
                    <TechLogo tech={tech} />
                  </div>
                );
              })
            : undefined}
        </div>
      </div>
    </Link>
  );
}
