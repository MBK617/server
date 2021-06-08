const express = require('express');
const { PostService } = require('../../services');
const { handleError } = require('../../utils/errors');
const app = express();

app.post('/' , (req, res) => {
  const userId = req.userId;
  const { postTitle, postBody } = req.body;
  try {
    PostService.createPost({ userId, postTitle, postBody }, (err) => {
      if(err) {
        return res.status(err.status).send(err.msg) 
      }
      return res.sendStatus(204);
    })
  } catch(err) {
    return handleError(res, err);
  }
});

app.get('/' , (req, res) => {
  try {
    const lastId = req.query.lastId
    PostService.getPosts({ lastId }, (err, posts) => {
      if(err) {
        return handleError(res, err)
      }
      return res.status(200).send(posts)
    });
  } catch (err) {
    return handleError(res, err);
  }
});

module.exports = app;