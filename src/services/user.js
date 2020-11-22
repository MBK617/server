const security = require('../utils/security')
const { User } = require('../database');
const ObjectID = require('mongodb').ObjectID

module.exports = {
  signUp: ({ userEmail, userPassword, userFirstName, userLastName, userBirthday, userAccountType }, callback) => {
    User.getUser({ email: userEmail }, { _id: 1 }, (err, user) => {
      if(!user) {
        const userSalt = security.generateSalt();
        const encryptedUserPassword = security.sha512(userPassword, userSalt);
        User.createUser({
          firstName: userFirstName,
          lastName: userLastName,
          email: userEmail,
          password: encryptedUserPassword,
          salt: userSalt,
          birthday: userBirthday,
          accountType: userAccountType
        }, callback);
      } else callback({ status: 400, msg: "Email already in system" })
    });
  },
  logIn: ({ userEmail, userPassword }, callback) => {
    User.getUser({ email: userEmail }, { password: 1, salt: 1, _id: 1 }, (err, user) => {
      try {
        if(err) throw err;
        if(!user) throw { status: 404, msg: "User not found" };
        const encryptedUserPassword = security.sha512(userPassword, user.salt);
        if(user.password !== encryptedUserPassword) throw { status: 401, msg: "Unauthorized" };
        callback(undefined, security.generateToken(user._id));
      } catch (err) {
        callback(err)
      }
    })
  },
  changePassword: ({ userId, userNewPassword }, callback) => {
    const userSalt = security.generateSalt();
    const encryptedNewUserPassword = security.sha512(userNewPassword, userSalt)
    User.updateUser({ _id: ObjectID(userId) }, { password: encryptedNewUserPassword, salt: userSalt }, callback);
  }
}