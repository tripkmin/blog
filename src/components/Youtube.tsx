import Youtube, { YouTubeProps } from 'react-youtube';
import style from '@/styles/libs.module.css';

export default function YoutubeComponents(props: YouTubeProps) {
  return (
    <Youtube
      key={props.videoId}
      videoId={props.videoId}
      className={style.videoWrapper}
      iframeClassName={style.videoContent}
      opts={{
        playerVars: {
          rel: 0,
          modestbranding: 1,
        },
      }}
      // onEnd={props.onEnd}
    ></Youtube>
  );
}
