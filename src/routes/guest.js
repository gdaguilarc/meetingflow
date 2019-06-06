import express from 'express';

const router = express.Router();

router.get('/', (req, res) =>
  res.render('guests', { layout: 'default', template: 'guess-template' })
);

export default router;
