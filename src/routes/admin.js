import express from 'express';
import accessManager from '../controllers/access-controller';

// eslint-disable-next-line new-cap
const router = express.Router();
const accessAdmin = (req, res, next) => accessManager(req, res, next, 'Admin');

router.get('/users', accessAdmin, (req, res) =>
  res.render('users-administration', { layout: 'main', template: 'guess-template' })
);

export default router;
