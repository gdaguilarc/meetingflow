import express from 'express';
import accessManager from '../../controllers/access-controller';
import Axios from 'axios';

// eslint-disable-next-line new-cap
const router = express.Router();
const accessUser = (req, res, next) => accessManager(req, res, next, 'Basic');

// Main route of the home page
router.get('/home', accessUser, async (req, res, next) => {
  const { data } = await Axios.get(
    `https://newsapi.org/v2/top-headlines?country=mx&apiKey=${process.env.NEWS_API_TOKEN}`
  );

  const { articles } = data;

  console.log(articles);
  console.log(articles[0].source);

  const access = req.user.authority === 'Admin';
  res.render('home', { layout: 'main', access, articles });
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});

export default router;
