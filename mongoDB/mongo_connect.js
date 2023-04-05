const { MongoClient } = require("mongodb");

// const url = "mongodb+srv://automation519:installat12345@cluster0.kmtdn97.mongodb.net/plating_temp?retryWrites=true&w=majority";
const url = "mongodb://localhost:27017/plating_temp";

let dbConnection;

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
