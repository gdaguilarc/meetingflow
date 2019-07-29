import express from 'express';
import accessManager from '../../controllers/access-controller';
import { getUsersPending, getActiveUsers } from '../../controllers/user-controller';

// eslint-disable-next-line new-cap
const router = express.Router();
const accessAdmin = (req, res, next) => accessManager(req, res, next, 'Admin');

router.get('/notifications', accessAdmin, async (req, res) => {
  const access = req.user.authority === 'Admin';

  const users = await getUsersPending();

  res.render('user/users-administration', {
    layout: 'main',
    users,
    access
  });
});

router.get('/users', accessAdmin, async (req, res) => {
  const access = req.user.authority === 'Admin';
  const users = await getActiveUsers();

  res.render('user/users', {
    layout: 'main',
    users,
    access,
    styleClass: 'display-table'
  });
});

export default router;
