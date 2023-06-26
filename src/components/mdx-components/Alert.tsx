import { ReactNode } from 'react';
import style from '@/styles/contents.module.css';
import { AutoStoriesIcon } from '@/styles/svgIcons';
interface AlertType extends React.HTMLAttributes<HTMLElement>{
  children: ReactNode;
  type: string;
}

export default function Alert({ children, type }: AlertType) {
  return (
    <div className={style.alertWrapper}>
      {/* <AutoStoriesIcon /> */}
      {children}
    </div>
  );
}
