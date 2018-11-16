import { CronJob } from 'cron';

const fetchData = () => {
  console.log('caca');
};

const job = new CronJob({
  cronTime: '0 0 * * * *',
  onTick: fetchData,
  start: false,
});

job.start();
