/**
 * @file
 * Provides all the routing work.
 *
 * The objective of this file is to gather all the different
 * routes files and be able to export them together
 */

import express from 'express';

const router = express.Router();

router.get('/', (req, res) => res.render('home', { layout: 'default', template: 'home-template' }));

export default router;
