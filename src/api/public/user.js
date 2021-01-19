const express = require('express');
const { UserService } = require('../../services');
const { validateEmail, validatePassword, validateName, validateDate, validateAccountType } = require('../../utils/validation');

const app = express();

app.post('/create_account' , (req, res) => {
  const { userEmail, userPassword, userFirstName, userLastName, userBirthday, userAccountType } = req.body;
  try {
    UserService.signUp({ userEmail: validateEmail(userEmail), userPassword: validatePassword(userPassword), userFirstName: validateName(userFirstName), userLastName: validateName(userLastName), userBirthday: validateDate(userBirthday), userAccountType: validateAccountType(userAccountType) }, (err) => {
      if(err) {
        return res.status(err.status).send({ error: err.msg }) 
      }
      return res.sendStatus(201) 
    })
  } catch (err) {
    return res.status(err.status).send({ error: err.msg });
  }
});

app.post('/login' , (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    UserService.logIn({ userEmail: validateEmail(userEmail), userPassword: validatePassword(userPassword) }, (err, token) => {
      if(err) {
        return res.status(err.status).send({ error: err.msg }) 
      }
      return res.status(200).send({token})
    });
  } catch (err) {
    return res.status(err.status).send({ error: err.msg }) 
  }
});

module.exports = app;