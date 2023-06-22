import { YoutubeIcon } from '@/styles/svgIcons';

export default function YoutubeDummy() {
  return (
    <div className="youtube-dummy">
      <YoutubeIcon width={40} />
      <small className="small-info">유튜브는 확대해야 재생가능 합니다.</small>
    </div>
  );
}
