const MongoClient = require('mongodb').MongoClient;
//const fs = require('fs');
//const path = require('path');

//const DB_CERT = process.env['CA_CERT'].replace(/\\n/g, '\n');
const DATABASE_URL = process.env['DATABASE_URL'];
const uri = DATABASE_URL

// const tlsCAFilePath = path.resolve(__dirname, 'certificate.pem');
// fs.writeFileSync(tlsCAFilePath, DB_CERT, { encoding: 'utf8' });

// Create a module-scoped MongoClient promise.
// CRITICAL: connect() must be called outside function handler so that the client
// can be reused across function invocations.

let client = new MongoClient(uri, {
  //tls: true,
  //tlsCAFile: tlsCAFilePath,
  //tlsInsecure: true
});

const connection = client.connect();

module.exports = async function connect() {
  await connection;
  return client;
};
