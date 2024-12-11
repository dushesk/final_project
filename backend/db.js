const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'tracker';
let db;

async function connect() {
  const client = await MongoClient.connect(url);
  db = client.db(dbName);
  console.log(`Connected to database: ${dbName}`);
}

function getDb() {
  if (!db) {
    throw new Error('Database is not initialized.');
  }{
    return db;
  }
  
}

module.exports = { connect, getDb };
