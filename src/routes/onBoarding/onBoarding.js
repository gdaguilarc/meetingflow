import express from 'express';
import passport from 'passport';
import { updateAppModel } from '../../controllers/onBoarding-controller';
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/firstConfiguration', (req, res) => {
  res.render('signup', {
    layout: 'setup',
    template: 'guess-template',
    method: '/setup/firstConfiguration'
  });
});

router.get('/companyConfiguration', (req, res) => {
  res.render('fresh-start', { layout: 'setup', template: '' });
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

router.post('/freshConfig', updateAppModel, (res, done) => {
  res.redirect('/post');
});

export default router;
