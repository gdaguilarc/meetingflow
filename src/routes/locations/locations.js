import express from 'express';
import accessManager from '../../controllers/access-controller';
import { newLocation } from '../../controllers/location-controller';

// eslint-disable-next-line new-cap
const router = express.Router();
const accessAdmin = (req, res, next) => accessManager(req, res, next, 'Admin');

router.get('/new-location', accessAdmin, async (req, res, next) => {
  const access = req.user.authority === 'Admin';
  res.render('new-location', {
    layout: 'main',
    access
  });
});

router.post('/create-location', newLocation);

export default router;
