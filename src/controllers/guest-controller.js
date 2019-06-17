import Guest from '../models/Guest-model';
import { isEmail } from 'validator';
import phone from 'phone';
import User from '../models/User-model';
import { welcomeGuest } from '../misc/mails/mail-templates';
import { sendMail } from './mail-sender';
import { getFirstName } from '../misc/tools/strings';

/**
 * Writes in the database the new guest
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function newGuest(req, res, next) {
  if (isValidData(req)) {
    const guest = new Guest();

    guest.name = req.body.name;
    guest.email = req.body.email;
    guest.organization = req.body.organization;
    guest.phone = formatPhone(req.body.phone);

    const { organizationName } = await User.findOne({});

    // TODO: Get the id not the name
    guest.id = hostDesignator(req.body.host);

    await guest.save(req.body.host);

    sendMail(
      req.body.email,
      `Welcome ${organizationName}!`,
      'Welcome',
      // TODO: Assignte a room
      welcomeGuest(getFirstName(req.body.name), organizationName, guest.host, 'Maya')
    );

    next();

    // TODO: Send mail to the host
    // TODO: if no host, send mail to designated emial
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

/**
 *  Designates the host of the guest
 * @param {String} host
 */
function hostDesignator(host) {}

export { newGuest };
