import Guest from '../models/Guest-model';
import { isEmail } from 'validator';
import phone from 'phone';
import User from '../models/User-model';
import App from '../models/Application-model';
import { welcomeGuest } from '../misc/mails/mail-templates';
import { sendMail } from './mail-sender';
import { getFirstName } from '../misc/tools/strings';
import moment from 'moment';

moment.locale('es');

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

    const { organizationName } = await App.findOne({});

    // TODO: Get the id not the name
    guest.host = req.body.host;
    await guest.save(req.body.host);

    const host = await User.findOne({ _id: req.body.host });

    sendMail(
      req.body.email,
      `Bienvenido a ${organizationName}!`,
      'Bienvenido',
      // TODO: Assignte a room
      welcomeGuest(getFirstName(req.body.name), organizationName, host.name, 'Maya')
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
 *
 * @param {string} _id
 * @return {Array}
 */
async function myGuests(_id) {
  return await Guest.find({
    host: _id
  });
}

/**
 * Retrieves the list of all the guests
 */
async function allGuests() {
  const guests = await Guest.find();
  const users = await User.find();
  const userNames = new Map();

  users.forEach(user => {
    userNames.set(String(user._doc._id), user._doc.name);
  });

  let allGuests = [];

  guests.forEach(guest => {
    allGuests.push({
      _doc: {
        ...guest._doc,
        hostName: userNames.get(String(guest._doc.host))
      }
    });
  });

  allGuests = formatDates(allGuests);
  return allGuests;
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
 *  Formats the date of the own user guests
 * @param {string} _id
 * @return {Array}
 */
async function ownGuests(_id) {
  const guests = await myGuests(_id);
  const formattedDates = formatDates(guests);
  return formattedDates;
}

/**
 * formats the dates of a given array of guests
 * @param {Array} guests
 * @return {Array} guests
 */
function formatDates(guests) {
  const formattedGuests = [];
  guests.forEach(guest => {
    if (guest._doc) {
      formattedGuests.push({
        ...guest._doc,
        dateFormatted: moment(guest._doc['RegistrationDateTime']).format('MMMM D YYYY, h:mm:ss a')
      });
    }
  });

  return formattedGuests;
}

export { newGuest, allGuests, ownGuests };
