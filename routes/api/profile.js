const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
const prependHttp = require("prepend-http");

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noProfile = 'There is no profile for this user';
          res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.body.skills)
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      //return errors
      res.status(400).json(errors);
    }
    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website)
    profileFields.website = prependHttp(req.body.website, {
    https: true
    });     

     if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.gitHubUserName)
      profileFields.gitHubUserName = req.body.gitHubUserName;
    //skills- split in to array
    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(',');
    }
    //social
    profileFields.social = {};
    if (req.body.youtube)
    profileFields.social.youtube = prependHttp(req.body.youtube, {
    https: true
    });
    if (req.body.twitter)
    profileFields.social.twitter = prependHttp(req.body.twitter, {
    https: true
    });
    if (req.body.facebook)
    profileFields.social.facebook = prependHttp(req.body.facebook, {
    https: true
    });
    if (req.body.linkedin)
    profileFields.social.linkedin = prependHttp(req.body.linkedin, {
    https: true
    });
    if (req.body.instagram)
    profileFields.social.instagram = prependHttp(req.body.instagram, {
    https: true
    });
   
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => {
          console.log(profile)
          res.json(profile);
        });
      } else {
        //create

        //check if handle exsists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'Handle is already exists';
            res.status(400).json(errors);
          }
          //save
          new Profile(profileFields).save().then(profile => {
            res.json(profile);
          });
        });
      }
    });
  }
);

//get profile by handle
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch(err => res.status(404).json(err));
});
//get profile by user id
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user ' })
    );
});
//get all profile
router.get('/all', (req, res) => {
  Profile.find({})
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = 'There are no profiles yet';
        res.status(404).json(errors);
      }
      res.status(200).json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

//add experience and education
//@access private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        //add to exp array
        //dont use push because push will make it at the end of an array.
        profile.experience.unshift(newExp);
        profile.save().then(profile => {
          res.json(profile);
        });
      })
      .catch(err => res.status(404).json(err));
  }
);
//add education
//@access private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldOfStudy: req.body.fieldOfStudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };
        //add to exp array
        //dont use push because push will make it at the end of an array.
        profile.education.unshift(newEdu);
        profile.save().then(profile => {
          res.json(profile);
        });
      })
      .catch(err => res.status(404).json(err));
  }
);

//delete exp
router.post(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);
        //splice out array
        profile.experience.splice(removeIndex, 1);
        profile.save().then(profile => {
          res.status(200).json(profile);
        });
      })
      .catch(err => res.status(404).json(err));
  }
);

//delete edu
router.post (
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);
        //splice out array
        profile.education.splice(removeIndex, 1);
        profile.save().then(profile => {
          res.status(200).json(profile);
        });
      })
      .catch(err => res.status(404).json(err));
  }
);
//delete profile
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() => {
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
