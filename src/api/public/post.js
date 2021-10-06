const express = require('express');
const { PostService } = require('../../services');
const { handleError } = require('../../utils/errors');
const app = express();

app.get('/' , (req, res) => {
  try {
    const lastId = req.query.lastId;
    const search = req.query.search;

    PostService.getPosts({ lastId, search, category: 'mbk' }, (err, posts) => {
      if(err) {
        return handleError(res, err)
      }
      return res.status(200).send(posts)
    });
  } catch (err) {
    return handleError(res, err);
  }
});

app.get('/:postId' , (req, res) => {
  try {
    const postId = req.params.postId;
    if(!postId || !/^[0-9a-fA-F]{24}$/.test(postId)) {
      return res.status(400).send("Bad request");
    }
    PostService.getPost({ postId }, (err, post) => {
      if(err) {
        return handleError(res, err)
      }
      return res.status(200).send(post)
    });
  } catch (err) {
    return handleError(res, err);
  }
});

module.exports = app;