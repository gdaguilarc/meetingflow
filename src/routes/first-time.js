import express from 'express';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('first-signup', { layout: 'setup', template: 'guess-template' });
});

// TODO: Check if onboarding applies
router.get('/introduction-to-meetings', (req, res) => {
  res.render('onboarding-meetings', { layout: 'setup', template: '' });
});

router.get('/introduction-to-reservations', (req, res) => {
  res.render('onboarding-reservations', { layout: 'setup', template: '' });
});

export default router;
