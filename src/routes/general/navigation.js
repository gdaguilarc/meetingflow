import express from 'express';
import accessManager from '../../controllers/access-controller';

// eslint-disable-next-line new-cap
const router = express.Router();
const accessUser = (req, res, next) => accessManager(req, res, next, 'Basic');

// Main route of the home page
router.get('/home', accessUser, (req, res, next) => {
  const access = req.user.authority === 'Admin';
  res.render('home', { layout: 'main', access });
});

export default router;
