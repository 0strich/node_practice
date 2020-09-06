const express = require('express');
const router = express.Router();
const passwdHashing = require('../middleware/encrypt')
const userController = require('../controllers/users');

router.post(
  '/signup',
  passwdHashing.changePasword,
  userController.signUp,
);

router.get(
  '/read',
  userController.usersInfo,
);

router.patch(
  '/update',
  userController.changeNickName,
);

router.delete(
  '/delete',
  userController.deleteUser,
);

// router.post(
//   '/login',
//   userController.tryLogin,
// );

module.exports = router;
