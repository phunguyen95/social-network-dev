const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
//db config
const db = require('./config/keys').mongoURI;
//connect to mongoosedb
mongoose
  .connect(db)
  .then(() => {
    console.log('connected');
  })
  .catch(err => {
    console.log(err);
  });
app.get('/', () => {});
//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(port);
});