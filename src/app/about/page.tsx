import SubHeader from '@/components/SubHeader';
import { phrases } from 'data/phrases';

export default function About() {
  return (
    <>
      <SubHeader
        title={phrases.About.title}
        description={phrases.About.description}
      ></SubHeader>
      <section>
        <div className="main-section">
          <p>진짜 온갖 효과 다 넣어서 여기 꾸며보고 만다</p>
        </div>
      </section>
    </>
  );
}
