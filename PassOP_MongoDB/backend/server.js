import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'

dotenv.config()
const url=process.env.MONGO_URI
const client = new MongoClient(url)

const dbName='myPassdb'

const app=express()
app.use(cors())
app.use(bodyParser.json())

//get all the passwords
app.get("/", async (req,res)=>{
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.find({}).toArray();
  res.send(findResult)
})

//save a password
app.post("/", async (req,res)=>{
  const password=req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.insertOne(password);
  res.send({success:true,result:findResult})
})

//delete a password by id
app.delete("/", async (req,res)=>{
  const password=req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.deleteOne(password);
  res.send({success:true,result:findResult})
})


app.listen(5500,()=>{
  console.log('Server running on http://localhost:5500');
})
