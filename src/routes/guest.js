import express from 'express';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', (req, res) =>
  res.render('guests', { layout: 'default', template: 'guess-template' })
);

export default router;