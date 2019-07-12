import express from 'express';
import { newGuest } from '../../controllers/guest-controller';
import { getActiveUsers } from '../../controllers/user-controller';
import ApplicationModel from '../../models/Application-model';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await getActiveUsers();
  const { organizationName } = await ApplicationModel.findOne({});
  res.render('guests', { layout: 'default', users, organizationName });
});

router.post('/register-guest', newGuest, (req, res, next) => {
  res.redirect('/post');
});

export default router;
