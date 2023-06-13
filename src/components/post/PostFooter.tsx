import styles from '@/styles/PostDetail.module.css';
import { LeftAngleIcon, RightAngleIcon, TagIcon, UndoIcon } from '@/styles/svgIcons';
import { filterNonDraft } from '@/utils/util';
import { Post, allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function PostFooter({ currentPost }: { currentPost: Post }) {
  // 이전 포스트, 다음 포스트를 위한 코드들
  const displayPosts = filterNonDraft(allPosts).sort((a, b) =>
    dayjs(b.date).diff(a.date)
  );
  const currentPostIdx = displayPosts.findIndex(el => el.title === currentPost.title);
  const prevPost = displayPosts[currentPostIdx - 1];
  const nextPost = displayPosts[currentPostIdx + 1];

  return (
    <section>
      <div className={styles.articleFooter}>
        <div className={styles.tagList}>
          <TagIcon width={16} style={{ marginRight: '7px' }} />
          {currentPost.tags?.map((el, idx) => (
            <span className={styles.tagElement} key={idx}>
              {el}
            </span>
          ))}
        </div>
        <div>
          <Link
            href="/post"
            aria-label="목록으로"
            className={`${styles.backToList} tooltip`}
          >
            <UndoIcon width={16} />
            {/* <ListIcon width={16} /> */}
          </Link>
        </div>
      </div>
      <div
        className={styles.pagination}
        style={!prevPost ? { flexFlow: 'row-reverse' } : undefined}
      >
        {prevPost ? (
          <Link href={`/${prevPost.url}`} className={styles.prevPagination}>
            <LeftAngleIcon width={36} style={{ marginRight: '5px' }} />
            <div>
              <h5>이전 글</h5>
              <h3>{prevPost.title}</h3>
            </div>
          </Link>
        ) : undefined}
        {nextPost ? (
          <Link href={`/${nextPost.url}`} className={styles.nextpagination}>
            <div>
              <h5>다음 글</h5>
              <h3>{nextPost.title}</h3>
            </div>
            <RightAngleIcon width={36} style={{ marginLeft: '5px' }} />
          </Link>
        ) : undefined}
      </div>
    </section>
  );
}
