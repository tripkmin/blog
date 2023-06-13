import { CalendarIcon, TimerIcon } from '@/styles/svgIcons';
import styles from '@/styles/PostDetail.module.css';
import { formattedDate } from '@/utils/util';
import { Post } from 'contentlayer/generated';

export default function PostHeader({ post }: { post: Post }) {
  return (
    <section className="sub-header post-title">
      <h1>{post.title}</h1>
      <div className={styles.infoBox}>
        <CalendarIcon width={12} style={{ marginRight: '5px' }} />
        <span className="small-info">
          <time dateTime={post.date}>{formattedDate(post.date)}</time>
        </span>
        <TimerIcon width={12} style={{ marginRight: '5px' }} />
        <span className="small-info">{post.readTimeMinutes}분</span>
      </div>
    </section>
  );
}
