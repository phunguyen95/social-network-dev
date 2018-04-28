const express = require('express');
const router = express.Router();
//load user model
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
router.get('/test', (req, res) => {
  res.json({ message: 'users works' });
});

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email already exist' });
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
            .catch(err => console.log(err));
        });
      });
    }
  });
});
module.exports = router;
