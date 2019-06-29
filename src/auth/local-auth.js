import passport from 'passport';
import local from 'passport-local';
import { isEmail } from 'validator';
import phone from 'phone';
import { sendMail } from '../controllers/mail-sender';
import User from '../models/User-model';
import App from '../models/Application-model';
import { welcomeUser } from '../misc/mails/mail-templates';

const LocalStrategy = local.Strategy;

/**
 * Serialize the user for the session
 * @type {[type]}
 */
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize to finish the session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      signUp(req, email, password, done, 'normal');
    }
  )
);

passport.use(
  'local-organizationAdmin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      signUp(req, email, password, done, 'organizationAdmin');
    }
  )
);

passport.use(
  'local-signin',
  new LocalStrategy( // <----- TODO: Local Sign In
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, req.flash('signinMessage', 'User not found'));
      }

      if (!user.validatePassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Wrong password'));
      }

      if (!user.isActivated) {
        return done(
          null,
          false,
          req.flash(
            'signinMessage',
            'Unauthorized user, please get in contact with an administrator'
          )
        );
      }

      return done(null, user);
    }
  )
);

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
 *
 * @param { Object } req
 * @param { String } email
 * @param { String } password
 * @param { Object } done
 * @param { String } authority
 */
async function signUp(req, email, password, done, authority) {
  // Validate that the user don't exist

  const user = await User.findOne({ email });

  if (user) {
    return done(null, false, req.flash('signupMessage', 'The user is unavailable'));
  } else {
    const newUser = new User();

    newUser.name = req.body.name;

    if (isEmail(email)) {
      newUser.email = email;
    } else {
      console.log(email);
      return done(null, false, req.flash('signupMessage', 'This is not a valid email'));
    }

    // TODO: Validate Password
    newUser.password = newUser.encryptPassword(password);

    const formatedPhone = formatPhone(req.body.phone);

    if (formatedPhone !== undefined) {
      newUser.phone = formatedPhone;
    } else {
      return done(null, false, req.flash('signupMessage', 'This is not a valid phone number'));
    }

    newUser.position = req.body.position;
    newUser.office = req.body.office;

    if (authority === 'organizationAdmin') {
      newUser.authority = 'Admin';
      newUser.isActivated = true;
      await newUser.save();

      // Update application
      const { _id } = await User.findOne({ authority: 'Admin', isActivated: true });
      await App.findOneAndUpdate({}, { organizationAdmin: _id });
    } else {
      await newUser.save();
    }

    // TODO: Finish the sender
    sendMail(req.body.email, 'Registration', 'Welcome to meetingflow', welcomeUser(req.body.name));

    done(null, newUser);
  }
}
