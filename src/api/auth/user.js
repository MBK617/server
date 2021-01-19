const express = require('express');
const { UserService } = require('../../services');
const { validatePassword } = require('../../utils/validation');

const app = express();

app.post('/change_password' , (req, res) => {
  const userId = req.userId;
  const { userNewPassword } = req.body;
  try {
    UserService.changePassword({ userId, userNewPassword: validatePassword(userNewPassword)}, (err) => {
      if(err) {
        return res.status(err.status).send(err.msg) 
      }
      return res.sendStatus(204);
    })
  } catch(err) {
    return res.status(err.status).send({ error: err.msg })
  }
  
});

module.exports = app;