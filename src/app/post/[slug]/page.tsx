import { fontMono } from '@/app/layout';
import { allPosts } from 'contentlayer/generated';
import dayjs from 'dayjs';
import { getMDXComponent } from 'next-contentlayer/hooks';
import Aside from './Aside';
import styles from './page.module.css';
import { filterNonDraft, scrollToTop } from '@/app/util';
import Link from 'next/link';
import {
  CalendarIcon,
  LeftAngleIcon,
  ListIcon,
  RightAngleIcon,
  TagIcon,
  TimerIcon,
  UndoIcon,
  UpIcon,
} from '@/styles/svgIcons';
import Pre from '@/components/mdx-components/Pre';
// import { Pre } from '@/component/Pre';

// export async function generateStaticParams() {
//   return allPosts.map(post => ({
//     slug: post._raw.flattenedPath,
//   }));
// }

export default function PostLayout({ params }: { params: { slug: string } }) {
  // if (!params) {
  //   // 체크하기
  //   return <div>Loading</div>;
  // }

  // 현재 포스트 정보를 가져오기 위한 코드들
  const post = allPosts.find(post => post._raw.flattenedPath === `post/${params.slug}`);
  // 여기서 post가 undefined일 경우 Content가 비정의되는 문제 해결
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  const MDXLayout = getMDXComponent(post.body.code);

  const formattedDate = dayjs(post.date).format('YYYY. MM. DD');

  /*
  - contentlayer.config.ts 설정대로 mdx 파일이 변환됨.
  - 클릭한 글과 매치되는 파일을 찾아 그걸 post에 할당함. 
  - 할당된 post 정보는 .contentlayer 폴더 안에 존재. 
  - post.body.code 부분을 추출해서 Content에 할당. 이 부분은 완전한 JS 코드로 이뤄짐
  - 이걸 컴포넌트로 넣으면 서버에서는 js 코드를 html로 변환함.
  */

  // 이전 포스트, 다음 포스트를 위한 코드들
  const posts = filterNonDraft(allPosts).sort((a, b) => dayjs(b.date).diff(a.date));
  const currentPostIdx = posts.findIndex(el => el.title === post.title);
  const prevPost = posts[currentPostIdx - 1];
  const nextPost = posts[currentPostIdx + 1];

  const components = {
    pre: Pre,
  };

  return (
    <>
      <section className="sub-header post-title">
        <h1>{post.title}</h1>
        <div className={styles.infoBox}>
          <CalendarIcon width={12} style={{ marginRight: '5px' }} />
          <span className="small-info">
            <time dateTime={post.date}>{formattedDate}</time>
          </span>
          <TimerIcon width={12} style={{ marginRight: '5px' }} />
          <span className="small-info">{post.readTimeMinutes}분</span>
        </div>
      </section>
      <article className="main-section content-area">
        <Aside headings={post.headings} params={params} title={post.title} />
        <MDXLayout className={fontMono.className} components={components} />
      </article>
      <section>
        <div className={styles.articleFooter}>
          <div className={styles.tagList}>
            <TagIcon width={16} style={{ marginRight: '7px' }} />
            {post.tags?.map((el, idx) => (
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
      <section className={styles.comment}>
        <span>댓글</span>
      </section>
    </>
  );
}
