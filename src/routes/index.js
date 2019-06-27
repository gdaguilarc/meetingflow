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
import firstTimeRoutes from './onBorading';

// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/', guestRoutes);
router.use('/', userRoutes);
router.use('/', adminRoutes);
router.use('/setup', firstTimeRoutes);

export default router;
