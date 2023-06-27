'use client';

import style from '@/styles/Post.module.css';
import { Post } from 'contentlayer/generated';
import PostCard from '@/components/post/PostCard';
import SubHeader from '@/components/common/SubHeader';
import { phrases } from 'data/phrases';

import { useState } from 'react';
import { SearchIcon } from '@/styles/svgIcons';
import { Pretendard } from '@/libs/fonts';
import useDebounce from '@/hooks/useDebounce';

interface ListLayoutType {
  posts: Post[];
}

export default function ListLayout({ posts }: ListLayoutType) {
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce(value, 300) as string;

  const filterPosts = (debouncedValue: string) => {
    if (debouncedValue === '') {
      return posts;
    } else {
      return posts.filter(
        post =>
          post.title.toLowerCase().includes(debouncedValue) ||
          post.series?.toLowerCase().includes(debouncedValue) ||
          post.tags?.some(tag => tag.toLowerCase().includes(debouncedValue)) ||
          post.techs?.some(tech => tech.toLowerCase().includes(debouncedValue))
      );
    }
  };

  const displayedPosts = filterPosts(debouncedValue);

  return (
    <>
      <SubHeader
        title={phrases.Post.title}
        description={phrases.Post.description}
      ></SubHeader>
      <section>
        <div className="main-section">
          <div>
            <div className={style.postListHeader}>
              <div className={style.postSummaryBox}>
                {debouncedValue === '' ? <h3>모든 게시글</h3> : <h3>검색된 게시글</h3>}
                <h5>({displayedPosts.length})</h5>
              </div>
              <div className={style.postSearchWrapper}>
                <SearchIcon width={20}></SearchIcon>
                <input
                  type="text"
                  value={value}
                  onChange={e => {
                    setValue(e.target.value.toLowerCase());
                  }}
                  className={Pretendard.className}
                ></input>
              </div>
            </div>
            <div className={style.postList}>
              {debouncedValue !== '' && displayedPosts.length === 0 ? (
                <div className={style.noPost}>
                  <h3>검색 결과가 없습니다</h3>
                </div>
              ) : (
                displayedPosts.map((post, idx) => <PostCard key={idx} {...post} />)
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
