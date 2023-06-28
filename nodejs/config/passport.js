import LocalStrategy from 'passport-local';
import User from '../modules/User.js';
import bcrypt from 'bcryptjs';
import passport from 'passport';

export default function () {
  // Local Strategy for Login by Email and Password 
  passport.use(
    'local-login',
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'emailerr' });
        }

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) throw err;

          if (match) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'passerr' });
          }
        });
      } catch (err) {
        return done(err);
      }
    })
  );
    // The serializeUser method is invoked when log in, and it determines what data from the user object should be stored in the session.
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // this method is invoked on every request by passport.session() middleware and it enables us to load additional user information on every request by fetching it from the database using the id that was serialized in the session.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (user) {
        done(null, user);
      } else {
        done('deserialization failed');
      }
    } catch (err) {
      done(err);
    }
  });
}

