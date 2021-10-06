const MongoClient = require('mongodb').MongoClient;
const CONN_STR = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
const CONN_ERR = { status: 500, msg: "Failed to connect to database" }

module.exports = {
  createUser: (user, callback) => {
    MongoClient.connect(CONN_STR, { useUnifiedTopology: true },  function(conn_err, client) {
      if (conn_err) return callback(CONN_ERR);
      const users = client.db(process.env.DATABASE).collection("users");
      users.insertOne(user, (err) => {
        client.close();
        callback(err && { status: 500, msg: err.message });
      });
      
    });
  },
  getUser: (query, fieldsRequested, callback) => {
    MongoClient.connect(CONN_STR, { useUnifiedTopology: true },  function(conn_err, client) {
      if (conn_err) return callback(CONN_ERR);
      const users = client.db(process.env.DATABASE).collection("users");
      users.findOne(query, { projection: fieldsRequested }, (err, res) => {
        client.close();
        callback(err && { status: 500, msg: err.message }, res);
      });
    });
  },
  updateUser: (query, user, callback) => {
    MongoClient.connect(CONN_STR, { useUnifiedTopology: true },  function(conn_err, client) {
      if (conn_err) return callback(CONN_ERR);
      const users = client.db(process.env.DATABASE).collection("users");
      users.updateOne(query, { $set: user }, (err, res) => {
        client.close();
        callback(err && { status: 500, msg: err.message });
      });
    });
    
  }
}
