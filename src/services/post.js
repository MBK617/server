const { Post } = require('../database');
const UserService = require('./user');
const ObjectID = require('mongodb').ObjectID

module.exports = {
  createPost: ({ userId, postTitle, postBody }, callback) => {
    UserService.isAdmin(userId, (err, isAdmin) => {
      try {
        if (err) throw err;
        Post.createPost({
          userId: ObjectID(userId),
          title: postTitle,
          body: postBody,
          approvalStatus: isAdmin,
        }, callback);
      } catch (err) {
        callback(err)
      }
    });
  },
  getPosts: ({ lastId, category, search }, callback) => {
    const paginationSettings = lastId ? { _id: { $lt : ObjectID(lastId) } } : {};
    let categorySettings; 
    switch(category) {
      case'feed': categorySettings = {}; break;
      case'opportunities': categorySettings = {}; break;
      case'mbk': categorySettings = { 'user.accountType': 'ADMIN' }
    } 
    Post.getPosts({ approvalStatus: true, ...paginationSettings, ...categorySettings }, { title: 1, body: 1, user: 1, createdAt: 1 }, search, (err, posts) => {
      try {
        if(err) throw err;
        callback(undefined, posts);
      } catch (err) {
        callback(err)
      }
    })
  },
  getPost: ({ postId }, callback) => {
    Post.getPost(postId, { title: 1, body: 1, user: 1, createdAt: 1 }, (err, post) => {
      try {
        if(!post) throw { status: 404, msg: "Post not found" };
        if(err) throw err;
        callback(undefined, post);
      } catch (err) {
        callback(err)
      }
    })
  }
}