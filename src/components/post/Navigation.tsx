'use client';
import { Post } from 'contentlayer/generated';
import { useState } from 'react';
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

export default function Navigation({
  allPosts,
  selectedSeries,
  setSelectedSeries,
  selectedTags,
  setSelectedTags,
  selectedTechs,
  setSelectedTechs,
}: NavigationProps) {
  const extractedTags = filterNonDraft(allPosts).flatMap(post => post.tags || []);
  const uniqueTags = [...Array.from(new Set(extractedTags))];

  const extractedTechs = filterNonDraft(allPosts).flatMap(post => post.techs || []);
  const uniqueTechs = [...Array.from(new Set(extractedTechs))];

  const extractedSeries = filterNonDraft(allPosts).flatMap(post => post.series || []);
  const uniqueSeries = [...Array.from(new Set(extractedSeries))];

  return (
    <div>
      <button
        onClick={() => {
          setSelectedSeries('');
          setSelectedTags([]);
          setSelectedTechs([]);
        }}
      >
        전부 초기화
      </button>
      <p>{selectedSeries}</p>
      <p>{selectedTags}</p>
      <p>{selectedTechs}</p>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      ></form>
      <div>
        <h2>
          시리즈
          <button
            onClick={() => {
              setSelectedSeries('');
            }}
          >
            시리즈 초기화
          </button>
        </h2>

        {uniqueSeries.map((singleSeries, idx) => (
          <div key={idx}>
            <button
              style={selectedSeries === singleSeries ? { color: 'red' } : undefined}
              onClick={() => {
                setSelectedSeries(selectedSeries === singleSeries ? '' : singleSeries);
              }}
            >
              {singleSeries}
            </button>
          </div>
        ))}
        <h2>
          태그{' '}
          <button
            onClick={() => {
              setSelectedTags([]);
            }}
          >
            초기화
          </button>
        </h2>
        {uniqueTags.map((singleTag, idx) => (
          <button
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
                ? { color: 'red' }
                : undefined
            }
          >
            {singleTag}
          </button>
        ))}
      </div>
      <div>
        <h2>
          기술{' '}
          <button
            onClick={() => {
              setSelectedTechs([]);
            }}
          >
            기술 초기화
          </button>
        </h2>
        {uniqueTechs.map((singleTech, idx) => (
          <button
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
                ? { color: 'red' }
                : undefined
            }
          >
            {singleTech}
          </button>
        ))}
      </div>
    </div>
  );
}
