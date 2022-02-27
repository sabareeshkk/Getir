const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getircase-study?retryWrites=true"
const dbName = 'getir-case-study';

const client = new MongoClient(uri);

let dbConnection;

module.exports = {
    /**
     * Initiate the connection to mongodbserver
     * @param {*} callback 
     */
    connectToServer: async (callback) => {
        await client.connect();
        dbConnection = client.db(dbName);
        console.log('Connected successfully to server');
    },
    /**
     * return the connection to mongodb server
     * @returns {Object} db connection to mongodb
     */
    getDb: function () {
        return dbConnection;
    },
};