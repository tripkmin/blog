import { Post, Project, Log } from 'contentlayer/generated';
import dayjs from 'dayjs';

type allDocuments = Post | Project | Log;

export const sortByDate = (documents: allDocuments[]) => {
  // sort 함수는 원본을 변형시키므로 shallow copy를 통해 원본 변형을 방지함.
  return [...documents].sort((a, b) => dayjs(b.date).diff(a.date));
};

export const excludeDrafts = (documents: allDocuments[]) => {
  return documents.filter(el => !el.draft);
};

export const getDrafts = (documents: allDocuments[]) => {
  return documents.filter(el => el.draft);
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const getBaseName = (name: string) => {
  return name.split('.')[0];
};

export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY. MM. DD');
};

export const renamed = (name: string) =>
  name
    .toLowerCase()
    .replace(/ /g, '')
    .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/g, '');

export const marginReturn = (level: number) => {
  switch (level) {
    case 1:
    case 2:
      // h1, h2에는 마진을 반환하지 않습니다.
      break;
    case 3:
      return { marginLeft: '10px' };
    case 4:
    case 5:
    case 6:
      return { marginLeft: '20px' };
    default:
      // 그 이외의 값에는 전부 마진을 반환하지 않습니다.
      break;
  }
};
