// 'use client';

import SubHeader from '@/components/common/SubHeader';
import { allProjects, Project } from 'contentlayer/generated';
import { phrases } from 'data/phrases';

export default function Project() {
  // draft가 false인 것들만 가져오고 최신순으로 정렬.

  return (
    <>
      <SubHeader
        title={phrases.Project.title}
        description={phrases.Project.description}
      ></SubHeader>
      <section>
        <div className="main-section">아직 없는디요</div>
      </section>
    </>
  );
}
