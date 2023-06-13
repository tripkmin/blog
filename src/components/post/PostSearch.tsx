'use client';

import { Post } from 'contentlayer/generated';
import { useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { filterNonDraft } from '../../utils/util';

type NavigationProps = {
  allPosts: Post[];
  selectedSeries: string;
  setSelectedSeries: React.Dispatch<React.SetStateAction<string>>;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTechs: string[];
  setSelectedTechs: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function PostSearch({
  allPosts,
  selectedSeries,
  setSelectedSeries,
  selectedTags,
  setSelectedTags,
  selectedTechs,
  setSelectedTechs,
}: NavigationProps) {
  const [isSeriesToggled, setIsSeriesToggled] = useState(true);
  const [isListToggled, setIsListToggled] = useState(true);

  const extractedTags = filterNonDraft(allPosts).flatMap(post => post.tags || []);
  const uniqueTags = [...Array.from(new Set(extractedTags))];

  const extractedTechs = filterNonDraft(allPosts).flatMap(post => post.techs || []);
  const uniqueTechs = [...Array.from(new Set(extractedTechs))];

  const extractedSeries = filterNonDraft(allPosts).flatMap(post => post.series || []);
  const uniqueSeries = [...Array.from(new Set(extractedSeries))];

  return (
    <aside>
      <details open>
        <summary
          onClick={() => {
            setIsSeriesToggled(prev => !prev);
          }}
        >
          <Image
            src="/icon/right-angle.svg"
            alt="theme toggle btn"
            width={16}
            height={16}
            className="no-drag"
            style={
              isSeriesToggled
                ? {
                    transform: 'rotate(90deg)',
                    transition: 'all 0.2s',
                    marginRight: '2px',
                  }
                : {
                    transform: 'rotate(0deg)',
                    transition: 'all 0.2s',
                    marginRight: '2px',
                  }
            }
          />

          <h3>시리즈</h3>
        </summary>
        <ul className={styles.ulMargin}>
          {uniqueSeries.map((singleSeries, idx) => (
            <li
              key={idx}
              className={styles.Btn}
              style={
                selectedSeries === singleSeries ? { background: '#FFE5E5' } : undefined
              }
              onClick={() => {
                setSelectedSeries(selectedSeries === singleSeries ? '' : singleSeries);
              }}
            >
              {singleSeries}
            </li>
          ))}
        </ul>
      </details>
      <details open>
        <summary
          onClick={() => {
            setIsListToggled(prev => !prev);
          }}
        >
          <Image
            src="/icon/right-angle.svg"
            alt="theme toggle btn"
            width={16}
            height={16}
            className="no-drag"
            style={
              isListToggled
                ? {
                    transform: 'rotate(90deg)',
                    transition: 'all 0.2s',
                    marginRight: '2px',
                  }
                : {
                    transform: 'rotate(0deg)',
                    transition: 'all 0.2s',
                    marginRight: '2px',
                  }
            }
          />
          <h3>리스트</h3>
        </summary>
        <ul>
          <li className={styles.ulMargin}>
            <h4>기술</h4>
            <ul>
              {uniqueTechs.map((singleTech, idx) => (
                <button
                  className={`${styles.Btn} ${styles.tagBtn}`}
                  key={idx}
                  onClick={() => {
                    setSelectedTechs(
                      selectedTechs.includes(singleTech)
                        ? selectedTechs.filter(selected => selected !== singleTech)
                        : [...selectedTechs, singleTech]
                    );
                  }}
                  style={
                    selectedTechs.find(selected => selected === singleTech)
                      ? { background: '#FFE5E5' }
                      : undefined
                  }
                >
                  {singleTech}
                </button>
              ))}
            </ul>
          </li>
          <li className={styles.ulMargin}>
            <h4>태그</h4>
            <ul>
              {uniqueTags.map((singleTag, idx) => (
                <button
                  className={`${styles.Btn} ${styles.tagBtn}`}
                  key={idx}
                  onClick={() => {
                    setSelectedTags(
                      selectedTags.includes(singleTag)
                        ? selectedTags.filter(selected => selected !== singleTag)
                        : [...selectedTags, singleTag]
                    );
                  }}
                  style={
                    selectedTags.find(selected => selected === singleTag)
                      ? { background: '#FFE5E5' }
                      : undefined
                  }
                >
                  {singleTag}
                </button>
              ))}
            </ul>
          </li>
        </ul>
      </details>
      <button
        className={styles.Btn}
        onClick={() => {
          setSelectedSeries('');
          setSelectedTags([]);
          setSelectedTechs([]);
        }}
      >
        <Image
          src="/icon/reset.svg"
          alt="series-reset-btn"
          width={16}
          height={16}
          className="no-drag"
        />
      </button>
    </aside>
  );
}
