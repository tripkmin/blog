'use client';

import { useState } from 'react';
import Aside from './Aside';
import styles from './page.module.css';
import { allPosts, Post } from 'contentlayer/generated';
import dayjs from 'dayjs';
import { filterNonDraft } from '../util';
import PostCard from './PostCard';

export default function Post() {
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // draft가 false인 것들만 가져오고 최신순으로 정렬.
  const posts = filterNonDraft(allPosts).sort((a, b) => dayjs(b.date).diff(a.date));

  const filteredPosts = posts.filter(
    post =>
      // 걸러진 포스트들 중 해당하는 시리즈만 검색되게 함..
      (selectedSeries === '' || post.series === selectedSeries) &&
      // 걸러진 포스트들 중 해당되는 태그만 검색되게 함.
      (selectedTags.length === 0 || post.tags?.some(tag => selectedTags.includes(tag))) &&
      // 걸러진 포스트들 중 해당되는 기술만 검색되게 함.
      (selectedTechs.length === 0 ||
        post.techs?.some(tech => selectedTechs.includes(tech)))
  );

  return (
    <>
      <section className="sub-header">
        <h1>포스트</h1>
        <p>개발과 관련된 여러가지 주제들을 다루고 있습니다.</p>
      </section>
      <section>
        <div className="main-section">
          {/* <Aside
            allPosts={allPosts}
            selectedSeries={selectedSeries}
            setSelectedSeries={setSelectedSeries}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
            selectedTechs={selectedTechs}
            setSelectedTechs={setSelectedTechs}
          /> */}
          <div>
            {selectedSeries === '' &&
            selectedTags.length === 0 &&
            selectedTechs.length === 0 ? (
              <>
                <div className={styles.postSummaryBox}>
                  <h3>모든 게시글</h3>
                  <h5>({posts.length})</h5>
                </div>
                <div className={styles.postList}>
                  {posts.map((post, idx) => (
                    <PostCard key={idx} {...post} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className={styles.postSummaryBox}>
                  <h3>검색된 게시글</h3>
                  <h5>({filteredPosts.length})</h5>
                </div>
                <div className={styles.postList}>
                  {filteredPosts.map((post, idx) => (
                    <PostCard key={idx} {...post} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
