import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/*', (req, res) => {
  const { protocol, originalUrl } = req;

  res.render('index', {
    url: `${protocol}://${req.get('host')}${originalUrl}`,
  });
});

/* eslint-disable promise/prefer-await-to-callbacks */
app.listen(3000, err => {
  if (err) throw new Error(err);
  console.log(`Express is listening`);
});
