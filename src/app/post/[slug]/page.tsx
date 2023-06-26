import { allPosts } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { fontMono } from '@/libs/fonts';
import styles from '@/styles/PostDetail.module.css';
import Pre from '@/components/mdx-components/Pre';
import { notFound } from 'next/navigation';
import TocAside from '@/components/post/TocAside';
import SubHeader from '@/components/post/SubHeader';
import SubFooter from '@/components/post/SubFooter';
import TopBtn from '@/components/common/TopBtn';
import YoutubeComponent from '@/components/YoutubeComponent';
import CustomLink from '@/components/mdx-components/CustomLink';
import TocMobileTop from '@/components/post/TocMobileTop';
import HoverLink from '@/components/mdx-components/HoverLink';
import Code from '@/components/mdx-components/Code';
import UnderLine from '@/components/mdx-components/UnderLine';
import Alert from '@/components/mdx-components/Alert';
import FigCaption from '@/components/mdx-components/FigCaption';

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
  // 여기서 post가 undefined일 경우 Content가 비정의되는 문제 해결
  // if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  const MDXLayout = getMDXComponent(currentPost.body.code);

  // MDX 컴포넌트에서 추가로 건드려 줄 부분
  const components = {
    pre: Pre,
    YoutubeComponent: YoutubeComponent,
    a: CustomLink,
    HoverLink: HoverLink,
    code: Code,
    u: UnderLine,
    Alert: Alert,
    Cap: FigCaption,
  };

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
        <MDXLayout className={fontMono.className} components={components} />
      </article>
      <SubFooter postdata={currentPost} />
      <section className={styles.comment}>
        <span>댓글</span>
      </section>
      <TopBtn />
    </>
  );
}
