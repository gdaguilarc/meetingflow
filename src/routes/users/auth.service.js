import express from 'express';
import passport from 'passport';
import ApplicationModel from '../../models/Application-model';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/signup', async (req, res) => {
  const { organizationName } = await ApplicationModel.findOne({});
  res.render('externalPages/signup', {
    layout: 'default',
    template: 'guess-template',
    method: '/signup',
    organizationName
  });
});

router.get('/signin', async (req, res) => {
  const { organizationName } = await ApplicationModel.findOne({});
  res.render('externalPages/signin', {
    layout: 'default',
    template: 'guess-template',
    organizationName
  });
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
    successRedirect: '/home',
    failureRedirect: '/signin',
    passReqToCallback: true
  })
);

export default router;
