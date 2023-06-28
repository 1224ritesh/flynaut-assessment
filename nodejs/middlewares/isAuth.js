import Encryption from '../services/Encryption.js';

// this middleware is used to check if the user is authenticated or not
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
    return next();
  } else {
    const enc = new Encryption();
    const path = req.url;
    const state = enc.hideString(path);
    res.redirect(`/?redirect=${state}`);
  }
};

export default isAuthenticated;
