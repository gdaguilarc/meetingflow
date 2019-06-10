import express from 'express';
import { newGuest } from '../controllers/guest-controller';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) =>
  res.render('guests', { layout: 'default', template: 'guess-template' })
);

router.post('/register-guest', newGuest, (req, res) => {
  res.redirect('/signin');
});

export default router;
