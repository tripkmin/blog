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
