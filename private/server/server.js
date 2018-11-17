import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import mongodb from './mongodb';
import fetcher from './worker/fetcher';

import News from './models/News';

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.delete('/disable', async (req, res) => {
  const objectID = req.body.id;
  await News.updateOne({ objectID }, { $set: { status: false } });
  return res.status(200).json({ message: 'Ok' });
});

app.get('/news', async (req, res) => {
  const news = await News.find({ status: true }).lean();
  return res.status(200).json(news);
});

app.get('/*', (req, res) => {
  const { protocol, originalUrl } = req;

  res.render('index', {
    url: `${protocol}://${req.get('host')}${originalUrl}`,
  });
});

console.log('Connecting to MongoDB....');

mongodb
  .connect(
    'mongodb://10.1.1.2:27017/reigndesign',
    { useNewUrlParser: true, useCreateIndex: true },
  )
  .then(() => {
    console.log('MongoDB connected successfully');

    return fetcher.start();
  })
  .catch(() => {
    console.log('Something went wrong');
  });

/* eslint-disable promise/prefer-await-to-callbacks */
app.listen(3000, err => {
  if (err) throw new Error(err);
  console.log(`Express is listening`);
});
