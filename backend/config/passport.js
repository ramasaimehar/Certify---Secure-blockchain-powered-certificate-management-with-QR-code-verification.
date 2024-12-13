const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/Userdata");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientId,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Find or create the user based on the Google ID
      try {
        let existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // If the user is not found, create a new user
        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,  // Store Google ID
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
