import { phrases } from 'data/phrases';
import SubHeader from '@/components/common/SubHeader';

export default function Home() {
  return (
    <>
      <SubHeader
        title={phrases.Home.title}
        description={phrases.Home.description}
      ></SubHeader>
      <section>
        <div className="main-section">
          <p>요호호</p>
        </div>
      </section>
    </>
  );
}
