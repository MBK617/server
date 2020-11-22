'use strict';
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = {
  sha512 : (password, salt) => {
      var hash = crypto.createHmac('sha512', salt);
      hash.update(password);
      var value = hash.digest('hex');
      return value;
  },
  generateSalt: (length=50) => {
      return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex')
          .slice(0, length);
  },
  generateToken: (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 86400 // 24 hours
    });
  },
  authenticate: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.SECRET)
      return decoded.id;
    }
    catch (err) {
      throw {status: 401, msg: 'Failed to authenticate token.'}
    }
  }
};