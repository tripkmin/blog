// 'use client';

import styles from './page.module.css';
import { allProjects, Project } from 'contentlayer/generated';
import dayjs from 'dayjs';

export default function Project() {
  // draft가 false인 것들만 가져오고 최신순으로 정렬.

  return (
    <>
      <section className="sub-header">
        <h1>프로젝트</h1>
        <p>소량의 피와 땀, 그리고 다량의 카페인으로 만들어진 프로젝트들입니다.</p>
      </section>
      <section>
        <div className="main-section">아직 없는디요</div>
      </section>
    </>
  );
}
