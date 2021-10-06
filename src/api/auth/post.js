const express = require('express');
const { PostService } = require('../../services');
const { handleError } = require('../../utils/errors');
const app = express();

app.post('/' , (req, res) => {
  const userId = req.userId;
  const { postTitle, postBody } = req.body;

  if(!(userId && postTitle && postBody)) {
    return res.status(400).send("Bad request");
  }
  
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
    const lastId = req.query.lastId;
    const search = req.query.search;
    const category = req.query.category;

    PostService.getPosts({ lastId, search, category }, (err, posts) => {
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