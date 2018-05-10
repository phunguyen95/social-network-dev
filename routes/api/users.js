const express = require('express');
const router = express.Router();
//load user model
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secretKey;
const passport = require('passport');
//load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
router.get('/test', (req, res) => {
  res.json({ message: 'users works' });
});

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exist';
      return res.status(400).json( errors );
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', //ratimg
        d: 'mm' //default
      });
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ user }))
            .catch(err => res.json(err));
        });
      });
    }
  });
});
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //find user by email
  User.findOne({ email }).then(user => {
    //check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(400).json(errors);
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //assign token
        const payload = { id: user._id, name: user.name, avatar: user.avatar };
        jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
          return res.json({ success: true, token: 'Bearer ' + token });
        });
      } else {
        errors.password = 'Password is incorrect';
        return res.status(400).json( errors );
      }
    });
  });
});

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      emai: req.user.email
    });
  }
);
module.exports = router;
