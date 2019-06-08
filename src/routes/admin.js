import express from 'express';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/users', (req, res) =>
  res.render('users-administration', { layout: 'main', template: 'guess-template' })
);

export default router;
