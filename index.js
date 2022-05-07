const express = require('express');
const driver = require('./Mongoconnect');
const app = express();

app.use(express.json());

app.get('', async (req, res)=>{
    const collection = await driver();
    const data = await collection.find({}).toArray();
    res.send(data);
})


app.post('/', async (req, res)=>{
    const collection = await driver();
    const data = req.body;
    const result = await collection.insertOne(data);
    if(result.acknowledged){
        res.send('Data added Succesfully');
    }
    else{
        res.send('Error Occured');
    }
});

app.put('/', async (req, res)=>{
    const collection = await driver();
    const data = req.body;
    const response = await collection.updateOne(data[0], data[1]);

    if(response.acknowledged){
        res.send("Data updated succesfully");
    }
    else{
        res.send("Some Error")
    }
})


app.delete('/', async (req, res)=>{
    const collection = await driver();
    const response = await collection.deleteOne(req.body);
    if(response.deletedCount == 0){
        res.send("No data Exists");
    }
    else if(response.deletedCount > 0){
        res.send("Data deleted success");
    }

    else {
        res.send({"Error" : "Erro Occured"});
    }
})


app.listen(4000);