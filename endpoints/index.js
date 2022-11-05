const express = require('express');
const { MongoClient } = require('mongodb');
const connectionString = "mongodb+srv://drdres25:FpUqaQMfNzDQ8@cluster0.z6lctgu.mongodb.net/?retryWrites=true&w=majority"; //only able to connect if ip is authorized
const client = new MongoClient(connectionString);
const dbName = "test";
const endpoints = express.Router();


endpoints.route('/agreements').post(async function (req, res) {
    await client.connect();
    const db = client.db(dbName);
    console.log({body: req.body})
    const document = {
      agreement: req.body.agreement,
      billing:req.body.billing,
      subsidiary: req.body.subsidiary,
      payment: req.body.payment,
      client: req.body.client,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    const col = db.collection("agreements");
    const result = await col.insertOne(document);
    console.log({result})
    if(result.acknowledged){
        res.status(200).send();
    } else {
        res.status(400).send('Unable to insert agreement')
    }
  });
  module.exports = endpoints;