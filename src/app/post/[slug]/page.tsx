import { allPosts } from 'contentlayer/generated';
import { fontMono } from '@/libs/fonts';
import { notFound } from 'next/navigation';
import { getMDXLayout, postComponents } from '@/components/mdx-components';
import styles from '@/styles/PostDetail.module.css';
import TocAside from '@/components/post/TocAside';
import SubHeader from '@/components/post/SubHeader';
import SubFooter from '@/components/post/SubFooter';
import TopBtn from '@/components/common/TopBtn';
import TocMobileTop from '@/components/post/TocMobileTop';

// post/[slug]로부터 뽑아져오는 props.params를 정의하기 위한 인터페이스
interface Props {
  params: {
    slug: string;
  };
}

// slug에 올 수 있는 모든 경로들을 계산해서 배열 형태로 만들어 빌드 시 미리 정적 생성하도록 만듬
export const generateStaticParams = async () => {
  return allPosts.map(post => ({
    slug: post._raw.sourceFileName.split('.mdx')[0],
  }));
};

export default function PostLayout({ params }: Props) {
  const currentPost = allPosts.find(
    post => post._raw.sourceFileName.split('.mdx')[0] === params.slug
  );

  if (!currentPost) {
    notFound();
  }

  const MDXLayout = getMDXLayout(currentPost.body.code);

  return (
    <>
      <SubHeader postdata={currentPost} />
      <TocMobileTop
        headings={currentPost.headings}
        params={params}
        title={currentPost.title}
      />
      <article className="main-section content-area">
        <TocAside
          headings={currentPost.headings}
          params={params}
          title={currentPost.title}
        />
        <MDXLayout className={fontMono.className} components={postComponents} />
      </article>
      <SubFooter postdata={currentPost} />
      <section className={styles.comment}>
        <span>댓글</span>
      </section>
      <TopBtn />
    </>
  );
}
