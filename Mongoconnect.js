const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const driver = async () =>{
    const connector  = await client.connect();
    const db = connector.db('newone');
    const collection = db.collection('newone');
    return collection;
}

module.exports = driver;