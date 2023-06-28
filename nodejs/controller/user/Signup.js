import User from '../../modules/User.js';
import Address from '../../modules/Address.js';
import Encryption from '../../services/Encryption.js';
import bcrypt from 'bcryptjs';

// this class is for the signup route

class Signup {
  get(req, res) {
    res.render('signup', { csrfToken: req.csrfToken() });
  }

  async post(req, res) {
    const { email = '', password = '', cpassword = '', redirect = '' } = req.body;

    const success = redirect !== ''
      ? (() => {
        const enc = new Encryption();
        return enc.showString(redirect);
      })()
      : '/dashboard';

    const err = [];

    if (email === '' || password === '' || cpassword === '') {
      err.push('emptyerr');
    }

    const emailRegEx = /^[\w-\.]+@[a-z]+.[a-z]+(.[a-z]+)?$/;
    if (email.match(emailRegEx) === null) {
      err.push('emailerr');
    }

    const passRegEx = /^[\w@]{4,20}$/;
    if (password.match(passRegEx) === null) {
      err.push('passerr');
    }

    if (password !== cpassword) {
      err.push('passmatcherr');
    }

    if (err.length > 0) {
      req.flash('error', err);
      req.flash('message', email);
      res.redirect('/signup');
    } else {
      const user = await User.findOne({ email });

      if (user) {
        err.push('userexist');
        req.flash('error', err);
        req.flash('message', email);
        res.redirect('/signup');
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const createdUser = await User.create({
          email,
          password: hash,
          type: '0',
        });

        // creating address for the user hardcoded
        await Address.create({
          uid: createdUser._id,
          country: 'India',
          state: 'Maharashtra',
          city: 'Pune',
          pincode: '411041',
          addressline: 'Narhe',
        });

        req.login(createdUser, (err) => {
          res.redirect(success);
        });
      }
    }
  }
}

export default new Signup();
