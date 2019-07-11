import express from 'express';
import routesAuth from './auth.service';
import routesUsers from './user';

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/', routesAuth);
router.use('/', routesUsers);

export default router;
