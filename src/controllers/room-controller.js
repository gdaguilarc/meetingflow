import Room from '../models/Room-model';
import Location from '../models/Location-model';

/**
 *
 * @param { Object } req
 * @param { Object } res
 * @return { Object }
 */
async function newRoom(req, res) {
  const room = await Room.findOne({ name: req.body.name, location: req.body.location });
  if (room) {
    req.flash('roomCreationMessage', 'Esa sala ya existe');
  } else {
    const newRoom = new Room();
    newRoom.name = req.body.name;
    newRoom.location = req.body.location;
    await newRoom.save();
  }
  res.redirect('/new-room');
}

/**
 *
 * @param { Object } req
 * @param { Object } res
 */
async function deleteRoom(req, res) {
  Room.deleteOne({ name: req.body.name });
}

/**
 * Returns an array of all the users
 * @return {Object []}
 */
async function getRooms() {
  const rooms = await Room.find();
  const locations = await Location.find();
  const locationMap = new Map();

  locations.forEach(location => {
    locationMap.set(String(location._doc._id), location._doc.firstLine);
  });

  const roomsLocation = [];

  rooms.forEach(room => {
    roomsLocation.push({
      ...room._doc,
      locationName: locationMap.get(String(room._doc.location))
    });
  });
  return roomsLocation;
}

export { newRoom, deleteRoom, getRooms };
