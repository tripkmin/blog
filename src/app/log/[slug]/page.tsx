import { allLogs } from 'contentlayer/generated';
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

// post/[slug]로부터 뽑아져오는 props.params를 정의하기 위한 인터페이스
interface Props {
  params: {
    slug: string;
  };
}

// slug에 올 수 있는 모든 경로들을 계산해서 배열 형태로 만들어 빌드 시 미리 정적 생성하도록 만듬
export const generateStaticParams = async () => {
  return allLogs.map(log => ({
    slug: log._raw.flattenedPath.split('/')[1],
  }));
};

export default function PostLayout({ params }: Props) {
  const currentLog = allLogs.find(log => log._raw.flattenedPath === `log/${params.slug}`);
  if (!currentLog) {
    notFound();
  }

  // 여기서 post가 undefined일 경우 Content가 비정의되는 문제 해결
  // if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  const MDXLayout = getMDXComponent(currentLog.body.code);

  // MDX 컴포넌트에서 추가로 건드려 줄 부분
  const components = {
    pre: Pre,
    YoutubeComponent: YoutubeComponent,
    a: CustomLink,
  };

  return (
    <>
      <SubHeader postdata={currentLog} />
      <TocMobileTop
        headings={currentLog.headings}
        params={params}
        title={currentLog.title}
      />
      <article className="main-section content-area">
        <TocAside
          headings={currentLog.headings}
          params={params}
          title={currentLog.title}
        />
        <MDXLayout className={fontMono.className} components={components} />
      </article>
      <SubFooter postdata={currentLog} />
      <section className={styles.comment}>
        <span>댓글</span>
      </section>
      <TopBtn />
    </>
  );
}
