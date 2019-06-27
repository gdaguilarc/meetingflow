import User from '../models/User-model';

/**
 * Returns an array of all the users
 * @return {Object []}
 */
async function getActiveUsers() {
  return await User.find({ isActivated: true });
}

/**
 * @return {Object []}
 */
async function getUsers() {
  return await User.find({ position: { $ne: 'default' } });
}

export { getActiveUsers, getUsers };
