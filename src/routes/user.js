import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('signup', { layout: 'default', template: 'guess-template' });
});

router.get('/post', (req, res) => {
  res.render('post-signup', { layout: 'default', template: 'guess-template' });
});

router.post(
  '/newuser',
  passport.authenticate('local-signup', {
    successRedirect: '/post',
    failureRedirect: '/signup',
    passReqToCallback: true
  })
);

export default router;
