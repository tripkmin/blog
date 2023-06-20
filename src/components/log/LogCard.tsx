import { Log } from 'contentlayer/generated';
import Link from 'next/link';
import styles from '@/styles/Post.module.css';
import { CalendarIcon, TimerIcon } from '@/styles/svgIcons';
import { formattedDate } from '@/utils/util';

export default function LogCard(log: Log) {
  return (
    <Link href={log.url}>
      <div className={styles.postWrapper}>
        <div className={styles.postLeft}>
          <div>
            {log.tags
              ? log.tags.map((tag, idx) => (
                  <span key={idx} className={`${styles.tagBadge} ${styles.badge}`}>
                    {tag}
                  </span>
                ))
              : undefined}
          </div>
          <div>
            <h4>{log.title}</h4>
          </div>
          <div className={styles.infoBox}>
            <div>
              <CalendarIcon width={10} style={{ marginRight: '5px' }} />
              <span className="small-info">{formattedDate(log.date)}</span>
              <TimerIcon width={10} style={{ marginRight: '5px' }} />
              <span className="small-info">{log.readTimeMinutes}분</span>
            </div>
          </div>
        </div>
        <div className={styles.postRight}></div>
      </div>
    </Link>
  );
}
