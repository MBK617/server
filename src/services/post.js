const { Post } = require('../database');
const UserService = require('./user');
const ObjectID = require('mongodb').ObjectID

module.exports = {
  createPost: ({ userId, postTitle, postBody }, callback) => {
    UserService.isAdmin(userId, (err, isAdmin) => {
      try {
        if (err) throw err;
        Post.createPost({
          userId,
          title: postTitle,
          body: postBody,
          approvalStatus: isAdmin,
        }, callback);
      } catch (err) {
        callback(err)
      }
    });
  },
  getPosts: ({ lastId }, callback) => {
    const paginationSettings = lastId ? { _id: { $gt : ObjectID(lastId) } } : {}
    Post.getPosts({ approvalStatus: true, ...paginationSettings }, { title: 1, body: 1, userID: 1 }, (err, posts) => {
      try {
        if(err) throw err;
        callback(undefined, posts);
      } catch (err) {
        callback(err)
      }
    })
  }
}