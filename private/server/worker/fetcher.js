import got from 'got';
import { CronJob } from 'cron';
import News from '../models/News';

const fetchData = async () => {
  const endpoint = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
  const response = await got(endpoint, { json: true });
  const news = response?.body?.hits || [];

  console.log('Fetching some news...');

  /* eslint-disable camelcase */
  await News.bulkWrite(
    news.map(
      ({
        objectID,
        story_url,
        story_title,
        url,
        title,
        author,
        created_at,
        created_at_i,
      }) => ({
        updateOne: {
          upsert: true,
          filter: { objectID },
          update: {
            $setOnInsert: {
              status: true,
            },
            objectID,
            story_url,
            story_title,
            url,
            title,
            author,
            created_at,
            created_at_i,
          },
        },
      }),
    ),
  );
  /* eslint-enable camelcase */
};

export const start = () => {
  const job = new CronJob({
    cronTime: '0 0 * * * *',
    onTick: fetchData,
    runOnInit: true,
    start: false,
  });

  job.start();
};

export default { start };
