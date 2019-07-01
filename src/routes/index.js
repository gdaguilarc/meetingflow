/**
 * @file
 * Provides all the routing work.
 *
 * The objective of this file is to gather all the different
 * routes files and be able to export them together
 */

import express from 'express';
import guestRoutes from './guest';
import userRoutes from './user';
import adminRoutes from './admin';
import onBoardingRoutes from './OnBoarding';

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/', guestRoutes);
router.use('/', userRoutes);
router.use('/admin', adminRoutes);
router.use('/setup', onBoardingRoutes);

export default router;
