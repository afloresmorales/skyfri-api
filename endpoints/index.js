const express = require('express');
const endpoints = express.Router();
const mongoDb = require('../db/config');
const crypto = require('crypto'); 

endpoints.route('/agreements').post(async function (req, res) {
    const db = mongoDb.getDb();
    console.log({body: req.body})
    const document = {
      agreement,
      billing:req.body.billing,
      subsidiary: req.body.subsidiary,
      payment: req.body.payment,
      client: req.body.client,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    const collection = db.collection("agreements");
    const result = await collection.insertOne(document);
    if(result.acknowledged){
        res.status(200).send();
    } else {
        res.status(400).send('Unable to insert agreement')
    }
  });
  endpoints.route('/users').post(async function (req, res) {
    const db = mongoDb.getDb();
    const salt = crypto.randomBytes(16).toString('hex'); 
    const {username, email, password, fullName} = req.body;
    const hashedPassword = crypto.pbkdf2Sync(password, salt,  
    1000, 64, `sha512`).toString(`hex`); 
    const document = {
      username,
      email,
      fullName,
      password: hashedPassword,
    };
    const collection = db.collection("users");
    const result = await collection.insertOne(document);
    console.log({result})
    if(result.acknowledged){
        res.status(200).send();
    } else {
        res.status(400).send('Unable to create user')
    }
  });
  endpoints.route('/users').get(async function (req, res) {
    const db = mongoDb.getDb();

     const {username} = req.query;
    
    const collection = db.collection("users");
    const result = await collection.findOne({username});
    if(result){
        res.status(200).json(result);
    } else {
        res.status(400).send('Unable to create user')
    }
  });
  module.exports = endpoints;