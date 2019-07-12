import Room from '../models/Room-model';
/**
 *
 * @param { Object } req
 * @param { Object } res
 * @return { Object }
 */
async function newRoom(req, res) {
  console.log(req.body.location);
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

export { newRoom, deleteRoom };
