import express from 'express';
import { newGuest } from '../../controllers/guest-controller';
import { getActiveUsers } from '../../controllers/user-controller';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await getActiveUsers();
  res.render('guests', { layout: 'default', users });
});

router.post('/register-guest', newGuest, (req, res, next) => {
  res.redirect('/post');
});

export default router;
