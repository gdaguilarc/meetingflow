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

/**
 * @return {Object []}
 */
async function getUsersPending() {
  return User.find({ position: { $ne: 'default' }, isActivated: false });
}

export { getActiveUsers, getUsers, getUsersPending };
