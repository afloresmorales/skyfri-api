const { MongoClient } = require('mongodb');
const connectionString = "mongodb+srv://drdres25:FpUqaQMfNzDQ8@cluster0.z6lctgu.mongodb.net/?retryWrites=true&w=majority"; //only able to connect if ip is authorized
const client = new MongoClient(connectionString);

let dbConnection = client.db('test');

module.exports = {
  connectToServer: function () {
    client.connect();
  },

  getDb: function () {
    return dbConnection;
  },
};