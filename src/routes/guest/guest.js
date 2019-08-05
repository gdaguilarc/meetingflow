import express from 'express';
import { newGuest, allGuests, ownGuests } from '../../controllers/guest-controller';
import { getActiveUsers } from '../../controllers/user-controller';
import ApplicationModel from '../../models/Application-model';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await getActiveUsers();
  const { organizationName } = await ApplicationModel.findOne({});
  res.render('externalPages/guests', { layout: 'default', users, organizationName });
});

router.post('/register-guest', newGuest, (req, res, next) => {
  res.redirect('/post');
});

router.get('/guests', async (req, res, next) => {
  const guests = await allGuests();
  res.render('guest/guestList', { layout: 'main', guests });
});

router.get('/myguests', async (req, res, next) => {
  const guests = await ownGuests(req.user._id);
  res.render('guest/myGuestList', { layout: 'main', guests });
});

export default router;
