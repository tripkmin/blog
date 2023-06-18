import { Post } from 'contentlayer/generated';
import dayjs from 'dayjs';

export const filterNonDraft = (allPost: Post[]) => {
  return allPost.filter(el => !el.draft);
};

export const selectedTheme = () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'light' || theme === null) {
    return 'light';
  } else {
    return 'dark';
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const formattedDate = (date: string) => {
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
