import passport from 'passport';
import { Strategy } from 'passport-local';
import { isEmail } from 'validator';
import phone from 'phone';

import User from '../models/User-model';

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
  new Strategy(
    {
      emailField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      // Validate that the user don't exist
      const user = await User.findOne({ username: username });

      if (user) {
        return done(null, false, req.flash('signupMessage', 'El usuario existe'));
      } else {
        const newUser = new User();

        // Get values from the form
        newUser.name = req.body.name;

        if (isEmail(email)) {
          newUser.email = email;
        } else {
          return done(null, false, req.flash('signupMessage', 'This is not a valid email'));
        }

        newUser.password = newUser.encryptPassword(password);
        newUser.phone = formatPhone(req.body.phone);
        newUser.position = req.body.position;
        newUser.office = req.body.office;

        await newUser.save();

        done(null, newUser);
      }
    }
  )
);

// passport.use(
//   'local-signin',
//   new Strategy() // <----- TODO: Local Sign In
//   // {
//   //   usernameField: 'username',
//   //   passwordField: 'password',
//   //   passReqToCallback: true
//   // },
//   // async (req, username, password, done) => {
//   //   const user = await User.findOne({ username: username });

//   //   if (!user) {
//   //     return done(null, false, req.flash('signinMessage', 'Usuario no encontrado'));
//   //   }

//   //   if (!user.validatePassword(password)) {
//   //     return done(null, false, req.flash('signinMessage', 'Credenciales Incorrectas'));
//   //   }

//   //   return done(null, user);
//   // }
// );

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
