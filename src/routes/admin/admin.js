import express from 'express';
import accessManager from '../../controllers/access-controller';
import { getUsersPending, getActiveUsers } from '../../controllers/user-controller';

// eslint-disable-next-line new-cap
const router = express.Router();
const accessAdmin = (req, res, next) => accessManager(req, res, next, 'Admin');

router.get('/notifications', accessAdmin, async (req, res) => {
  const access = req.user.authority ? 'Admin' : 'Basic';

  const users = await getUsersPending();
  const halfWayThough = Math.floor(users.length / 2);

  const arrayFirstHalf = users.slice(0, halfWayThough);
  const arraySecondHalf = users.slice(halfWayThough, users.length);

  res.render('users-administration', {
    layout: 'main',
    users_1: arrayFirstHalf,
    users_2: arraySecondHalf,
    access
  });
});

router.get('/users', accessAdmin, async (req, res) => {
  const access = req.user.authority ? 'Admin' : 'Basic';
  const users = await getActiveUsers();

  res.render('users', {
    layout: 'main',
    users,
    access,
    styleClass: 'display-table'
  });
});

export default router;
