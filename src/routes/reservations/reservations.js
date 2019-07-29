import express from 'express';
import accessManager from '../../controllers/access-controller';
import { getLocations } from '../../controllers/location-controller';
import moment from 'moment';
import reservationModel from '../../models/Reservation-model';
import RoomModel from '../../models/Room-model';
import ReservationModel from '../../models/Reservation-model';
import { getHistory } from '../../controllers/reservation-controller';
import { sendMail } from '../../controllers/mail-sender';
import { reservationMade } from '../../misc/mails/mail-templates';
import UserModel from '../../models/User-model';
import LocationModel from '../../models/Location-model';
import ApplicationModel from '../../models/Application-model';

moment.locale('es');

// eslint-disable-next-line new-cap
const router = express.Router();
const accessUser = (req, res, next) => accessManager(req, res, next);

router.get('/reservations', accessUser, async (req, res, next) => {
  const access = req.user.authority === 'Admin';
  const locations = await getLocations();
  res.render('reservation-location', {
    layout: 'main',
    locations,
    access
  });
});

router.get('/history', accessUser, async (req, res, next) => {
  const access = req.user.authority === 'Admin';
  const history = await getHistory();
  res.render('history', {
    layout: 'main',
    access,
    history
  });
});

router.post('/reservations/location', (req, res, next) => {
  const access = req.user.authority ? 'Admin' : 'Basic';
  const location = req.body.location;
  const start = moment();
  const remainder = 30 - (start.minute() % 30);
  const minDate = moment(start)
    .add(remainder, 'minutes')
    .format('YYYY-MM-DD[T]HH:mm');

  res.render('reservation-date', {
    layout: 'main',
    location,
    minDate,
    access
  });
});

router.post('/reservations/:id', async (req, res, next) => {
  const access = req.user.authority ? 'Admin' : 'Basic';
  const locationID = req.params.id;
  const startDate = req.body.meetingTime;
  const duration = req.body.time;
  const endDate = moment(startDate)
    .add(duration, 'hours')
    .format('YYYY-MM-DD[T]HH:mm');
  const locationRooms = await RoomModel.find({ location: locationID });
  const roomsID = [];
  locationRooms.forEach(room => {
    roomsID.push(room._id);
  });
  const reservationsLocation = await reservationModel.find({
    $and: [
      { room: { $in: roomsID } },
      {
        $or: [
          { startTime: { $gte: startDate, $lt: endDate } },
          { finalTime: { $gte: startDate, $lt: endDate } }
        ]
      }
    ]
  });
  const occupiedID = [];
  reservationsLocation.forEach(reservation => {
    occupiedID.push(reservation.room);
  });
  const rooms = await RoomModel.find({ location: locationID, _id: { $nin: occupiedID } });

  res.render('reservation-room', {
    layout: 'main',
    access,
    startDate,
    duration,
    rooms
  });
});

router.post('/reservation/:startDate/:time', async (req, res, next) => {
  const startDate = req.params.startDate;
  const duration = req.params.time;
  const endDate = moment(startDate)
    .add(duration, 'hours')
    .format('YYYY-MM-DD[T]HH:mm');

  const newReservation = new ReservationModel();
  newReservation.user = req.user._id;
  newReservation.room = req.body.room;
  newReservation.startTime = startDate;
  newReservation.finalTime = endDate;
  newReservation.save();

  const user = await UserModel.findOne({ _id: req.user._id });
  const room = await RoomModel.findOne({ _id: req.body.room });
  const { firstLine } = await LocationModel.findOne({ _id: room.location });
  const { organizationName } = await ApplicationModel.findOne();
  sendMail(
    user.email,
    'Reservación',
    'Has reservado una sala',
    reservationMade(
      user.name,
      room.name,
      firstLine,
      moment(startDate).format('LL'),
      moment(startDate).format('LT'),
      moment(endDate).format('LT'),
      organizationName
    )
  );

  res.redirect('/reservations');
});
export default router;
