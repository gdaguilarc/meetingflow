import express from 'express';
import accessManager from '../../controllers/access-controller';
import { getLocations } from '../../controllers/location-controller';
import { getRooms, newRoom } from '../../controllers/room-controller';
import RoomModel from '../../models/Room-model';
import LocationModel from '../../models/Location-model';

// eslint-disable-next-line new-cap
const router = express.Router();
const accessAdmin = (req, res, next) => accessManager(req, res, next, 'Admin');
const accessUser = (req, res, next) => accessManager(req, res, next);

router.get('/rooms', accessUser, async (req, res) => {
  const access = req.user.authority === 'Admin';
  const rooms = await getRooms();
  res.render('rooms', {
    layout: 'main',
    rooms,
    access,
    styleClass: 'display-table'
  });
});

router.get('/new-room', accessAdmin, async (req, res) => {
  const access = req.user.authority ? 'Admin' : 'Basic';
  const locations = await getLocations();
  res.render('room-creation', {
    layout: 'main',
    locations,
    access
  });
});

router.get('/rooms/update/:id', accessAdmin, async (req, res, next) => {
  const room = await RoomModel.findOne({ _id: req.params.id });
  const currentLocation = await LocationModel.findOne({ _id: room.location });
  const locations = await LocationModel.find({ _id: { $ne: room.location } });
  const access = req.user.authority === 'Admin';
  res.render('room-update', {
    layout: 'main',
    access,
    room,
    locations,
    currentLocation
  });
});

router.post('/room/update/:id', async (req, res, next) => {
  const { name, location } = req.body;
  const variables = {
    name,
    location
  };
  const room = await RoomModel.findOne({ _id: { $ne: req.params.id }, name, location });
  if (room) {
    req.flash('roomCreationMessage', 'Esa sala ya existe');
    res.redirect(`/rooms/update/${req.params.id}`);
  } else {
    await RoomModel.findByIdAndUpdate({ _id: req.params.id }, variables);
    res.redirect('/rooms');
  }
});

router.post('/createRoom', newRoom);

export default router;
