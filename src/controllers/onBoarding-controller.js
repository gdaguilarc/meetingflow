import App from '../models/Application-model';

/**
 *
 * @param {*} req
 * @param {*} done
 */
async function updateAppModel(req, done) {
  if (isValidData(req)) {
    await App.findOneAndUpdate(
      {},
      {
        firstTimeSetup: true,
        organizationName: req.body.organization,
        designatedHost: req.body.email
      }
    );
  } else {
    req.flash('guestRegisterMessage', 'Por favor llena todos los campos');
  }
}

/**
 * Checks if the request has the specified data
 * @param {*} req
 * @return {Boolean}
 */
function isValidData(req) {
  return req.body.organization && req.body.email;
}

export { updateAppModel };
