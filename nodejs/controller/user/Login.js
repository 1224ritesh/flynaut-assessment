import Encryption from '../../services/Encryption.js';
import passport from 'passport';

// this class is for the login route 
// the get method is used to render the login page and the post method is used to authenticate the user and redirect to the dashboard page.
class Login {
  get(req, res) {
    res.render('login', { csrfToken: req.csrfToken() });
  }

  post(req, res, next) {
    var rdr = req.body.redirect;
    if (rdr !== '') {
      var enc = new Encryption();
      var success = enc.showString(rdr);
    } else {
      var success = '/dashboard';
    }

    passport.authenticate('local-login', {
      successRedirect: success,
      failureRedirect: `/?redirect=${rdr}`,
      failureFlash: true,
    })(req, res, next);
  }

  logout(req, res) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}

export default new Login();

