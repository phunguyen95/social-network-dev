const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const validatePostInput = require('../../validation/post');
router.get('/test', (req, res) => {
  res.json({ message: 'users works' });
});
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {errors,isValid } = validatePostInput(req.body);
  if(!isValid){
    res.status(400).json(errors);
  }
  const newPost = new Post({
    text:req.body.text,
    name:req.body.name,
    avatar:req.body.avatar,
    user:req.user.id
  });
  console.log(newPost);
  newPost.save().then(post=>res.json(post));
})
router.get('/',(req,res)=>{
  Post.find({})
  .sort({date:-1})
  .then(posts=>{
    res.status(200).json(posts)
  })
  .catch(err=>res.status(404).json(err));
})
//get post by id
router.get('/:id',(req,res)=>{
  Post.findById({_id:req.params.id})
  .then(post=>{
    res.status(200).json(post)
  })
  .catch((err)=>{
    res.status(404).json({errors:"Cant not find that post"})
  });
})
//delete post
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const postId = req.params.id;
  Profile.findOne({_id:req.user.id}).then((profile)=>{
    Post.findById(req.params.id)
    .then(post=>{
        if(post.user.toString()!==req.user.id){
          return res.status(401).json({errors:"Not authorize"})
        }
        post.remove().then(()=>{
          res.json({success:true})
        })
        .catch(err=>res.status(404).json({errors:"Not found"}));
    })
    .catch((err)=>res.status(400).json({message:"Error occurs"}))
  })
 
})
//add likes
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({_id:req.user.id}).then((profile)=>{
    Post.findById(req.params.id)
    .then(post=>{
      if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
        return res.status(400).json({errors:"You already like this post"})
      }
      post.likes.unshift({user:req.user.id});
      post.save().then(post=>{
        return res.status(200).json(post)
      })
      .catch(err=>res.status(400).json({errors:"Cant be able to like the post"}))
    })
  })
});
//unlike
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({_id:req.user.id}).then((profile)=>{
    Post.findById(req.params.id)
    .then(post=>{
      if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
        return res.status(400).json({errors:"You havent like this post"})
      }
      const removeIndex = post.likes.map(item=>item.user).toString().indexOf(req.user.id)
      post.likes.splice(removeIndex,1);
      post.save()
      .then(res.status(200).json({message:"Success"}))
    })
    .catch(err=>res.status(404).json({message:"Unable to find that post"}))
  })  
})
//add comment
router.post('/comment/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  console.log(req.body);
  const {errors,isValid } = validatePostInput(req.body);
  if(!isValid){
    res.status(400).json(errors);
  }
  Post.findById(req.params.id)
  .then(post=>{
    const newComment = {
      text:req.body.text,
      user:req.user.id,
      avatar:req.body.avatar,
      name:req.body.name,
    }
    post.comments.unshift(newComment);
    post.save().then(result=>{
      res.status(200).json(result)
    })
    .catch(err=>res.status(404).json({message:err}))
  })
})
//remove comment
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);
module.exports = router;
