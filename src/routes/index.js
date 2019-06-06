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

const router = express.Router();

router.use('/', guestRoutes);
router.use('/', userRoutes);

export default router;
