import { Post } from 'contentlayer/generated';

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
