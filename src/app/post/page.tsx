// 'use client';

// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import Aside from './Aside';
import styles from '@/styles/Post.module.css';
import dayjs from 'dayjs';
import { allPosts, Post } from 'contentlayer/generated';
import { filterNonDraft } from '../../utils/util';
import PostCard from '@/components/post/PostCard';
import SubHeader from '@/components/common/SubHeader';
import { phrases } from 'data/phrases';

export default function Post() {
  // const [selectedSeries, setSelectedSeries] = useState('');
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  // draft가 false인 것들만 가져오고 최신순으로 정렬.
  const posts = (filterNonDraft(allPosts) as Post[]).sort((a, b) =>
    dayjs(b.date).diff(a.date)
  );

  // const filteredPosts = posts.filter(
  //   post =>
  //     // 걸러진 포스트들 중 해당하는 시리즈만 검색되게 함..
  //     (selectedSeries === '' || post.series === selectedSeries) &&
  //     // 걸러진 포스트들 중 해당되는 태그만 검색되게 함.
  //     (selectedTags.length === 0 || post.tags?.some(tag => selectedTags.includes(tag))) &&
  //     // 걸러진 포스트들 중 해당되는 기술만 검색되게 함.
  //     (selectedTechs.length === 0 ||
  //       post.techs?.some(tech => selectedTechs.includes(tech)))
  // );

  return (
    <>
      <SubHeader
        title={phrases.Post.title}
        description={phrases.Post.description}
      ></SubHeader>
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
            <div className={styles.postSummaryBox}>
              <h3>모든 게시글</h3>
              <h5>({posts.length})</h5>
            </div>
            <div className={styles.postList}>
              {posts.map((post, idx) => (
                <PostCard key={idx} {...post} />
              ))}
            </div>
          </div>
          {/* <div>
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
          </div> */}
        </div>
      </section>
    </>
  );
}
