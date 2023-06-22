import { defineDocumentType, makeSource } from '@contentlayer/source-files';
import readingTime from 'reading-time'; // 읽기 시간 계산 라이브러리
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // 제목에 자동으로 앵커 태그를 추가해주는 라이브러리
import rehypeSlug from 'rehype-slug'; // 제목의 슬러그(slug) 생성을 위한 라이브러리
import remarkGfm from 'remark-gfm'; // GitHub Flavored Markdown을 지원하기 위한 라이브러리
import remarkToc from 'remark-toc'; // 목차(TOC, Table of Contents)를 생성해주는 라이브러리
import GithubSlugger from 'github-slugger'; // 슬러그(slug) 생성을 위한 라이브러리
import remarkBreaks from 'remark-breaks';
import rehypePrettyCode from 'rehype-pretty-code';
import { rehypePrettyCodeOptions } from './src/libs/rehypePrettyCode';
import { rehypeAutolinkHeadingsOptions } from './src/libs/rehypeAutolinkHeadings';

// 'Post' 문서 유형 정의
export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `post/**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    draft: { type: 'boolean', required: false },
    series: { type: 'string', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    techs: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    url: { type: 'string', resolve: post => post._raw.sourceFileName.split('.mdx')[0] },
    readTimeMinutes: {
      type: 'number',
      resolve: post => Math.ceil(readingTime(post.body.raw).minutes), // 'readTimeMinutes' 계산 필드, 숫자 타입, 본문의 읽기 시간을 분 단위로 계산
    },
    headings: {
      type: 'json',
      resolve: async post => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g; // 제목(heading)을 찾기 위한 정규식
        const slugger = new GithubSlugger(); // 슬러그(slug) 생성기 인스턴스 생성
        const headings = Array.from(post.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length, // h 태그의 레벨을 계산해서 반환해줌 ( ex: level: 2 === <h2> )
              text: content, // h 태그 내용을 그대로 반환해줌 ( ex: 'TL;DR' )
              slug: content ? slugger.slug(content) : undefined, // h 태그 내용을 URL에 적합한 형태로 가공해서 반환 ( ex: 'tldr' )
            };
          }
        );
        return headings;
      },
    },
  },
}));

// 'Project' 문서 유형 정의
export const Project = defineDocumentType(() => ({
  name: 'Project',
  contentType: 'mdx',
  filePathPattern: `project/**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    startDate: { type: 'date', required: false },
    endDate: { type: 'date', required: false },
    draft: { type: 'boolean', required: false },
    techs: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    url: { type: 'string', resolve: project => `${project._raw.flattenedPath}` },
    readTimeMinutes: {
      type: 'number',
      resolve: post => Math.ceil(readingTime(post.body.raw).minutes), // 'readTimeMinutes' 계산 필드, 숫자 타입, 본문의 읽기 시간을 분 단위로 계산
    },
  },
}));

export const Log = defineDocumentType(() => ({
  name: 'Log',
  contentType: 'mdx',
  filePathPattern: `log/**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    draft: { type: 'boolean', required: false },
    tags: { type: 'list', of: { type: 'string' }, required: false },
  },
  computedFields: {
    url: { type: 'string', resolve: post => post._raw.flattenedPath },
    readTimeMinutes: {
      type: 'number',
      resolve: post => Math.ceil(readingTime(post.body.raw).minutes), // 'readTimeMinutes' 계산 필드, 숫자 타입, 본문의 읽기 시간을 분 단위로 계산
    },
    headings: {
      type: 'json',
      resolve: async post => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g; // 제목(heading)을 찾기 위한 정규식
        const slugger = new GithubSlugger(); // 슬러그(slug) 생성기 인스턴스 생성
        const headings = Array.from(post.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length, // h 태그의 레벨을 계산해서 반환해줌 ( ex: level: 2 === <h2> )
              text: content, // h 태그 내용을 그대로 반환해줌 ( ex: 'TL;DR' )
              slug: content ? slugger.slug(content) : undefined, // h 태그 내용을 URL에 적합한 형태로 가공해서 반환 ( ex: 'tldr' )
            };
          }
        );
        return headings;
      },
    },
  },
}));

// 'makeSource' 함수를 사용하여 데이터 소스 생성
export default makeSource({
  contentDirPath: 'posts', // 내용이 있는 디렉토리 경로
  documentTypes: [Post, Project, Log], // 사용할 문서 유형 목록
  mdx: {
    remarkPlugins: [
      remarkBreaks, // 마크다운에서 줄바꿈 하려면 space 두 번 쳐야 하는데, 이거 사용하면 마크다운에서 쓴 대로 줄바꿈이 됨.
      remarkToc, // Table of Contents를 만들어주는 플러그인
      remarkGfm, // 취소선, 주석, 테이블 등등의 마크다운 추가 기능을 지원하는 플러그인
    ],
    rehypePlugins: [
      rehypeSlug, // 슬러그(slug) 생성을 위한 플러그인
      [rehypePrettyCode, rehypePrettyCodeOptions],
      [
        rehypeAutolinkHeadings, // 제목에 자동으로 앵커 태그 추가를 위한 플러그인
        rehypeAutolinkHeadingsOptions,
      ],
    ],
  },
});
