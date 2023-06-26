import styles from '@/styles/Post.module.css';
import dayjs from 'dayjs';
import { allLogs, Log } from 'contentlayer/generated';
import { excludeDrafts } from '../../utils/util';
import SubHeader from '@/components/common/SubHeader';
import { phrases } from 'data/phrases';
import LogCard from '@/components/log/LogCard';

export default function Post() {
  const logs = (excludeDrafts(allLogs) as Log[]).sort((a, b) =>
    dayjs(b.date).diff(a.date)
  );

  return (
    <>
      <SubHeader
        title={phrases.Log.title}
        description={phrases.Log.description}></SubHeader>
      <section>
        <div className="main-section">
          <div>
            <div className={styles.postSummaryBox}>
              <h3>전체 글</h3>
              <h5>({logs.length})</h5>
            </div>
            <div className={styles.postList}>
              {logs.map((log, idx) => (
                <LogCard key={idx} {...log} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
