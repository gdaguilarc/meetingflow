import express from 'express';
import UserModel from '../../models/User-model';
import accessManager from '../../controllers/access-controller';

const accessAdmin = (req, res, next) => accessManager(req, res, next, 'Admin');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/user/delete/:id', accessAdmin, async (req, res, next) => {
  const _id = req.params.id;
  await UserModel.deleteOne({ _id });
  res.redirect('/users');
});

router.post('/user/accept/:id', accessAdmin, async (req, res, next) => {
  const _id = req.params.id;
  await UserModel.findByIdAndUpdate(
    { _id },
    {
      isActivated: true
    }
  );
  res.redirect('/notifications');
});

router.get('/user/profile/:id', accessManager, async (req, res, next) => {
  const access = req.user.authority === 'Admin';
  const user = await UserModel.findOne({ _id: req.params.id });
  const authorizedEdit = req.user._id === req.params.id || access === true;

  res.render('user/profile', {
    layout: 'main',
    styleClass: 'expandbody',
    user,
    access,
    authorizedEdit
  });
});

router.post('/user/update/:id', accessAdmin, async (req, res, next) => {
  const { position, phone, email, office, authority } = req.body;

  const variables = {
    position,
    phone,
    email,
    office,
    authority: authority === '1' ? 'Admin' : 'Basic'
  };
  await UserModel.findByIdAndUpdate({ _id: req.params.id }, variables);
  res.redirect(`/user/profile/${req.params.id}`);
});

export default router;
