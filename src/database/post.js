const MongoClient = require('mongodb').MongoClient;
const CONN_STR = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}?authSource=admin`;
const CONN_ERR = { status: 500, msg: "Failed to connect to database" }
const COLLECTION = "posts"

module.exports = {
  createPost: (post, callback) => {
    MongoClient.connect(CONN_STR, { useUnifiedTopology: true },  function(conn_err, client) {
      if (conn_err) return callback(CONN_ERR);
      const posts = client.db(process.env.DATABASE).collection(COLLECTION);
      posts.insertOne(post, (err) => {
        client.close();
        callback(err && { status: 500, msg: err.message });
      });
    });
  },
  getPosts: (query, fieldsRequested, callback) => {
    MongoClient.connect(CONN_STR, { useUnifiedTopology: true },  function(conn_err, client) {
      if (conn_err) return callback(CONN_ERR);
      const posts = client.db(process.env.DATABASE).collection(COLLECTION);
      posts.find(query, { projection: fieldsRequested }).limit(25).toArray((err, res) => {
        client.close();
        callback(err && { status: 500, msg: err.message }, res);
      });
    });
  },
  updatePost: (query, user, callback) => {
    MongoClient.connect(CONN_STR, { useUnifiedTopology: true },  function(conn_err, client) {
      if (conn_err) return callback(CONN_ERR);
      const posts = client.db(process.env.DATABASE).collection(COLLECTION);
      posts.updateOne(query, { $set: user }, (err, res) => {
        client.close();
        callback(err && { status: 500, msg: err.message });
      });
    });
  },
  deletePost: (query, callback) => {
    MongoClient.connect(CONN_STR, { useUnifiedTopology: true },  function(conn_err, client) {
      if (conn_err) return callback(CONN_ERR);
      const posts = client.db(process.env.DATABASE).collection(COLLECTION);
      posts.deleteOne(query, (err, res) => {
        client.close();
        callback(err && { status: 500, msg: err.message });
      });
    });
  }   
}
