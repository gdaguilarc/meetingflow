import User from '../models/User-model';

/**
 * Returns an array of all the users
 * @return {Object []}
 */
async function getActiveUsers() {
  return await User.find({ isActivated: true });
}

export { getActiveUsers };
