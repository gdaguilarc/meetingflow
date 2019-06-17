import passport from 'passport';
import local from 'passport-local';
import { isEmail } from 'validator';
import phone from 'phone';
import { sendMail } from '../controllers/mail-sender';
import User from '../models/User-model';
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
    async (req, email, password, done) => {
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
          console.log('No Valid email');
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

        await newUser.save();

        sendMail(
          req.body.email,
          'Registration',
          'Welcome to meetingflow',
          welcomeUser(req.body.name)
        );

        done(null, newUser);
      }
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
