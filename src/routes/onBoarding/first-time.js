import express from 'express';
import passport from 'passport';
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/firstConfiguration', (req, res) => {
  res.render('signup', {
    layout: 'setup',
    template: 'guess-template',
    method: '/setup/firstConfiguration'
  });
});

// TODO: Check if onboarding applies
router.get('/introduction-to-meetings', (req, res) => {
  res.render('onboarding-meetings', { layout: 'setup', template: '' });
});

router.get('/introduction-to-reservations', (req, res) => {
  res.render('onboarding-reservations', { layout: 'setup', template: '' });
});

router.post(
  '/firstConfiguration',
  passport.authenticate('local-organizationAdmin', {
    successRedirect: '/post',
    failureRedirect: '/setup/firstConfiguration',
    passReqToCallback: true
  })
);

export default router;
