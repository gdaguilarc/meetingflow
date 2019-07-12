/**
 * @file
 * Provides all the routing work.
 *
 * The objective of this file is to gather all the different
 * routes files and be able to export them together
 */

import express from 'express';

import userRoutes from './users';
import adminRoutes from './admin';
import guestRoutes from './guest';
import generalRoutes from './general';
import roomRoutes from './rooms';
import firstTimeRoutes from './onBoarding';

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/', guestRoutes);
router.use('/', userRoutes);
router.use('/', adminRoutes);
router.use('/', generalRoutes);
router.use('/', roomRoutes);
router.use('/setup', onBoardingRoutes);

export default router;
