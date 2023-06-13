import { fontMono } from '@/libs/fonts';
import { allPosts } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';
import styles from '@/styles/PostDetail.module.css';
import Pre from '@/components/mdx-components/Pre';
import { notFound } from 'next/navigation';
import TocAside from '@/components/post/TocAside';
import PostHeader from '@/components/post/PostHeader';
import PostFooter from '@/components/post/PostFooter';
import TopBtn from '@/components/common/TopBtn';

// post/[slug]로부터 뽑아져오는 props.params를 정의하기 위한 인터페이스
interface Props {
  params: {
    slug: string;
  };
}

// slug에 올 수 있는 모든 경로들을 계산해서 배열 형태로 만들어 빌드 시 미리 정적 생성하도록 만듬
export const generateStaticParams = async () => {
  return allPosts.map(post => ({
    slug: post._raw.flattenedPath.split('/')[1],
  }));
};

export default function PostLayout({ params }: Props) {
  const currentPost = allPosts.find(
    post => post._raw.flattenedPath === `post/${params.slug}`
  );
  if (!currentPost) {
    notFound();
  }

  // 여기서 post가 undefined일 경우 Content가 비정의되는 문제 해결
  // if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  const MDXLayout = getMDXComponent(currentPost.body.code);

  // MDX 컴포넌트에서 추가로 건드려 줄 부분
  const components = {
    pre: Pre,
  };

  return (
    <>
      <PostHeader post={currentPost} />
      <article className="main-section content-area">
        <TocAside
          headings={currentPost.headings}
          params={params}
          title={currentPost.title}
        />
        <MDXLayout className={fontMono.className} components={components} />
      </article>
      <PostFooter currentPost={currentPost} />
      <section className={styles.comment}>
        <span>댓글</span>
      </section>
      <TopBtn />
    </>
  );
}
