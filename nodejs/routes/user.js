import express from 'express';

const router = express.Router();

import loginController from '../controller/user/Login.js';
import dashboardController from '../controller/user/Dashboard.js';
import signupController from '../controller/user/Signup.js';

import notAuth from '../middlewares/notAuth.js';
import isAuth from '../middlewares/isAuth.js';

// Routes for user related pages
router.route('/')
    .get(notAuth, loginController.get)
    .post(notAuth, loginController.post);

router.route('/signup')
    .get(notAuth, signupController.get)
    .post(notAuth, signupController.post);

router.route('/dashboard')
    .get(isAuth, dashboardController.get)
    .post(isAuth, dashboardController.post);

router.route('/logout')
    .get(loginController.logout);

export default router;
