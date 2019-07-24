import Location from '../models/Location-model';

/**
 * @return { Object }
 */
async function getLocations() {
  return await Location.find({});
}

/**
 *
 * @param { Object } req
 * @param { Object } res
 * @param { Object } next
 * @return { Object }
 */
async function newLocation(req, res, next) {
  let location;
  if (req.body.internal) {
    location = await Location.findOne({
      firstLine: req.body.street,
      externalNumber: req.body.external,
      internalNumber: req.body.internal
    });
  } else {
    location = await Location.findOne({
      firstLine: req.body.street,
      externalNumber: req.body.external
    });
  }

  if (location) {
    req.flash('locationCreationMessage', 'Esa ubicación ya existe');
    res.redirect('/new-location');
  } else {
    const locationNew = new Location();
    locationNew.firstLine = req.body.street;
    locationNew.externalNumber = req.body.external;
    locationNew.internalNumber = req.body.internal;
    await locationNew.save();
    res.redirect('/new-room');
  }
}

export { getLocations, newLocation };
