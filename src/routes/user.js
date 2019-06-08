import express from 'express';
import passport from 'passport';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('signup', { layout: 'default', template: 'guess-template' });
});

router.get('/signin', (req, res) => {
  res.render('signin', { layout: 'default', template: 'guess-template' });
});

router.get('/post', (req, res) => {
  res.render('post-signup', { layout: 'default', template: 'guess-template' });
});

router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/post',
    failureRedirect: '/signup',
    passReqToCallback: true
  })
);

router.post(
  '/signin',
  passport.authenticate('local-signin', {
    successRedirect: '/Post',
    failureRedirect: '/signin',
    passReqToCallback: true
  })
);

export default router;
