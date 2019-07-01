import express from 'express';
import passport from 'passport';
import { updateAppModel } from '../../controllers/onBoarding-controller';
import { isSetup } from '../../controllers/application-controller';
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/firstConfiguration', async (req, res) => {
  const setup = await isSetup();
  if (!setup) {
    res.render('signup', {
      layout: 'setup',
      template: 'guess-template',
      method: '/setup/firstConfiguration'
    });
  } else {
    res.redirect('/');
  }
});

router.get('/companyConfiguration', async (req, res) => {
  const setup = await isSetup();
  if (!setup) {
    res.render('fresh-start', { layout: 'setup', template: '' });
  } else {
    res.redirect('/');
  }
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
    successRedirect: '/setup/companyConfiguration',
    failureRedirect: '/setup/firstConfiguration',
    passReqToCallback: true
  })
);

router.post('/freshConfig', updateAppModel, (req, res, next) => {
  res.redirect('/');
});

export default router;
