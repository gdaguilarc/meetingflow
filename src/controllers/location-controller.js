import Location from '../models/Location-model';

/**
 * @return { Object }
 */
async function getLocations() {
  return await Location.find({});
}

export { getLocations };
