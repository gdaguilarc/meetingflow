import express from 'express';
import { newGuest } from '../controllers/guest-controller';
import '../controllers/application-controller';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.render('guests', { layout: 'default', template: 'guess-template' });
});

router.post('/register-guest', newGuest, (req, res, next) => {
  res.redirect('/post');
});

export default router;
