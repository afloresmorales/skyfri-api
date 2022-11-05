const express = require('express');
const endpoints = express.Router();
const mongoDb = require('../db/config');

endpoints.route('/agreements').post(async function (req, res) {
    const db = mongoDb.getDb();
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
  endpoints.route('/users').post(async function (req, res) {
    const db = mongoDb.getDb();
    console.log({body: req.body})
    const document = {
      username: req.body.username,
      email:req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
    };
    const col = db.collection("users");
    const result = await col.insertOne(document);
    console.log({result})
    if(result.acknowledged){
        res.status(200).send();
    } else {
        res.status(400).send('Unable to insert agreement')
    }
  });
  module.exports = endpoints;