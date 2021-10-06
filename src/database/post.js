const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const CONN_STR = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
const CONN_ERR = { status: 500, msg: "Failed to connect to database" };
const COLLECTION = "posts";

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
  getPosts: (query, fieldsRequested, search='', callback) => {
    MongoClient.connect(CONN_STR, { useUnifiedTopology: true },  function(conn_err, client) {
      if (conn_err) return callback(CONN_ERR);
      client.db(process.env.DATABASE).collection(COLLECTION).aggregate([
        ...(search ? [
          { 
            $match: { 
              $text: { 
                $search: search, 
                $caseSensitive: false, 
                $language: 'english'
              } 
            } 
          }
        ] : []),
        {
          '$lookup': {
            from: "users",
            as: "users",
            let: { userId: "$userId" },
            pipeline: [ 
              { $match: { $expr: { $eq: ["$$userId", "$_id"] } } },
              { "$project": { firstName: 1, lastName: 1, accountType: 1 }}
            ]
          }
        },
        { 
          '$addFields': {
            createdAt: { $convert: { input: '$_id', to: 'date' }},
            user: { '$arrayElemAt': [ '$users', 0 ] }
          } 
        },
        { '$match': query },
        { '$sort': { _id: -1 } },
        { '$limit': 15 },
        { 
          '$project': {
            ...fieldsRequested
          } 
        },
      ]).toArray((err, res) => {
        client.close();
        callback(err && { status: 500, msg: err.message }, res);
      });
    });
  },
  getPost: (id, fieldsRequested, callback) => {
    MongoClient.connect(CONN_STR, { useUnifiedTopology: true },  function(conn_err, client) {
      if (conn_err) return callback(CONN_ERR);
      client.db(process.env.DATABASE).collection(COLLECTION).aggregate([
        { '$match': { $expr: { $eq: [ObjectID(id), "$_id"] } } },
        {
          '$lookup': {
            from: "users",
            as: "users",
            let: { userId: "$userId" },
            pipeline: [ 
              { $match: { $expr: { $eq: ["$$userId", "$_id"] } } },
              { "$project": { firstName: 1, lastName: 1, accountType: 1 }}
            ]
          }
        },
        { 
          '$addFields': {
            createdAt: { $convert: { input: '$_id', to: 'date' }},
            user: { '$arrayElemAt': [ '$users', 0 ] }
          } 
        },
        { '$limit': 1 },
        { 
          '$project': {
            ...fieldsRequested
          } 
        },
      ]).toArray((err, res) => {
        client.close();
        callback(err && { status: 500, msg: err.message }, res[0]);
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
