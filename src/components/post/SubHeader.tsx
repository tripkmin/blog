import { CalendarIcon, TimerIcon } from '@/styles/svgIcons';
import styles from '@/styles/PostDetail.module.css';
import { formattedDate } from '@/utils/util';
import { Log, Post, Project } from 'contentlayer/generated';

interface SubHeaderType {
  postdata: Post | Project | Log;
}

export default function SubHeader({ postdata }: SubHeaderType) {
  return (
    <section className="sub-header post-title">
      <h1>{postdata.title}</h1>
      <div className={styles.infoBox}>
        <CalendarIcon width={12} style={{ marginRight: '5px' }} />
        <span className="small-info">
          <time dateTime={postdata.date}>{formattedDate(postdata.date)}</time>
        </span>
        <TimerIcon width={12} style={{ marginRight: '5px' }} />
        <span className="small-info">{postdata.readTimeMinutes}분</span>
      </div>
    </section>
  );
}
