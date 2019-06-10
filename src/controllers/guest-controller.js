import Guest from '../models/Guest-model';
import { isEmail } from 'validator';
import phone from 'phone';
import User from '../models/User-model';

/**
 * Writes in the database the new guest
 * @param {*} req
 * @param {*} res
 */
async function newGuest(req, res) {
  console.log(req.body);
  if (isValidData(req)) {
    const guest = new Guest();

    guest.name = req.body.name;
    guest.email = req.body.email;
    guest.organization = req.body.organization;
    guest.phone = formatPhone(req.body.phone);

    const user = await User.findOne({ name: req.body.host });

    // TODO: Handle the not host
    guest.host = user.id;
    await guest.save();

    // TODO: Send mail to the host
  } else {
    req.flash('guestRegisterMessage', 'Please enter all the data requested');
    res.redirect('/');
  }
}

/**
 * Checks if the request has the specified data
 * @param {*} req
 * @return {Boolean}
 */
function isValidData(req) {
  return (
    req.body.name &&
    req.body.email &&
    req.body.organization &&
    isEmail(req.body.email) &&
    req.body.phone &&
    formatPhone(req.body.phone) &&
    req.body.host
  );
}

/**
 *  Formats the phone number using
 * @param {String} number
 * @param {String} regionCode
 *
 * @return {String}
 */
function formatPhone(number, regionCode = 'MX') {
  return phone(number, regionCode)[0];
}

export { newGuest };
