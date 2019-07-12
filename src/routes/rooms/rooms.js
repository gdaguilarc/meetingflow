import express from 'express';
import accessManager from '../../controllers/access-controller';
import { getLocations } from '../../controllers/location-controller';
import { newRoom } from '../../controllers/room-controller';

// eslint-disable-next-line new-cap
const router = express.Router();
const accessAdmin = (req, res, next) => accessManager(req, res, next, 'Admin');

router.get('/new-room', accessAdmin, async (req, res) => {
  const access = req.user.authority ? 'Admin' : 'Basic';
  const locations = await getLocations();
  res.render('room-creation', {
    layout: 'main',
    locations,
    access
  });
});

router.post('/createRoom', newRoom);

export default router;
