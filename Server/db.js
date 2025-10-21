const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGODB_URI);
let db;

async function connectToDB() {
  await client.connect();
  db = client.db('employeeDirectory');
  console.log('Connected to MongoDB');
}

function getDB() {
  return db;
}

module.exports = { connectToDB, getDB };
