const { MongoClient } = require('mongodb');
require('dotenv').config();

// const uri = 'mongodb+srv://db_user_read:LdmrVA5EDEv4z3Wr@cluster0.n10ox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(process.env.MONGO_URI);

let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        console.log("Connected to database")
        db = client.db('test');
    }
    return db;
}

module.exports = connectDB;
