import reservationModel from '../models/Reservation-model';
import userModel from '../models/User-model';
import roomModel from '../models/Room-model';
import locationModel from '../models/Location-model';
import moment from 'moment';

/**
 * @return {Object []}
 */
async function getHistory() {
  const users = await userModel.find();
  const rooms = await roomModel.find();
  const locations = await locationModel.find();
  const reservations = await reservationModel.find();
  const roomMap = new Map();
  const locationMap = new Map();
  const userMap = new Map();
  const locationRoomMap = new Map();
  const history = [];
  users.forEach(user => {
    userMap.set(String(user._doc._id), user._doc.name);
  });
  locations.forEach(location => {
    locationMap.set(String(location._doc._id), location._doc.firstLine);
  });
  rooms.forEach(room => {
    roomMap.set(String(room._doc._id), room._doc.name);
    locationRoomMap.set(String(room._doc._id), locationMap.get(String(room._doc.location)));
  });

  reservations.forEach(reservation => {
    const date1 = moment(reservation._doc.startTime);
    const date2 = moment(reservation._doc.finalTime);
    const time = date2.diff(date1, 'hours');
    history.push({
      date: moment(reservation._doc.startTime).format('LL'),
      dateTime: moment(reservation._doc.startTime).format('LT'),
      userName: userMap.get(String(reservation._doc.user)),
      roomName: roomMap.get(String(reservation._doc.room)),
      locationName: locationRoomMap.get(String(reservation._doc.room)),
      timeUsed: time
    });
  });

  return history;
}

export { getHistory };
