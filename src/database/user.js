const MongoClient = require('mongodb').MongoClient;

let db, users;

MongoClient.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`, { useUnifiedTopology: true },  function(err, client) {
  if (err) throw err;
  db = client.db(process.env.DATABASE);
  users = db.collection("users")
});

module.exports = {
  createUser: (user, callback) => {
    users.insertOne(user, (err) => {
      callback(err && { status: 500, msg: err.message });
    });
  },
  getUser: (query, projection, callback) => {
    users.findOne(query, { projection }, (err, res) => {
      callback(err && { status: 500, msg: err.message }, res);
    });
  },
  updateUser: (query, user, callback) => {
    users.updateOne(query, { $set: user }, (err, res) => {
      callback(err && { status: 500, msg: err.message });
    });
  }
}
