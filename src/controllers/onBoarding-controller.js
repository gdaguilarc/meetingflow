import App from '../models/Application-model';
import User from '../models/User-model';

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function updateAppModel(req, res, next) {
  if (isValidData(req)) {
    let defaultUser = await User.findOne({ email: req.body.email });

    if (defaultUser === undefined) {
      defaultUser = await User.findOne({ email: 'default@company.com' });
    }
    await App.findOneAndUpdate(
      {
        firstTimeSetup: false
      },
      {
        firstTimeSetup: true,
        organizationName: req.body.organization,
        designatedHost: defaultUser._id
      }
    );

    next();
  } else {
    req.flash('onBoardingRegisterMessage', 'Por favor llena todos los campos');
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
