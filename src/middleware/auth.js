const security = require('../utils/security')

module.exports = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    req.userId = security.authenticate(token)
    next();
  } catch (err) {
   res.status(err.status).json(err.msg)
  }
}
