import style from '@/styles/contents.module.css';
import { ReactNode } from 'react';

interface FigCaptionType {
  children: ReactNode;
}
export default function FigCaption({ children }: FigCaptionType) {
  return <figcaption className={style.figCaption}>{children}</figcaption>;
}
