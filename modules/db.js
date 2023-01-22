const { ObjectId, ServerApiVersion, MongoClient } = require('mongodb');

/* const MongoClient = require('mongodb').MongoClient; */

class Mongo{

  uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@dbase.oj0xm.mongodb.net/?retryWrites=true&w=majority`;
  client = new MongoClient(this.uri, { useNewUrlParser: true, useUnifiedTopology: true,  serverApi: ServerApiVersion.v1 });

  connect(){
    return new Promise(async(resolve,reject)=>{
      resolve(await this.client.connect())
    })
  }

  async channelList(){
    try{
      await this.client.connect();
      let collections = await this.client.db("channels").listCollections().toArray();
      this.client.close();
      return collections.map(collection=>{
        return collection.name;
      })
    }
    catch(err){
      console.log(err)
    }
    /* return new Promise(async(resolve, reject)=>{
      let client = await this.connect().catch(err=>this.error(err,reject));
      if(client === undefined) return;
      client.db("channels").listCollections().toArray((err,collections)=>{
        resolve(collections.map(collection=>{
          return collection.name
        }))
        client.close()
      })
    }) */
  }

  async getnums(){
    try{
      return await this.client.db('fake_numbers').collection('numbers').find().toArray()
    }
    catch(err){
      console.log(err)
    }
  }

  async createUser(name, email, passHash, options){
    try{
      let doc = {
        name,
        email,
        passHash
      }
      if(options && options.superUser)
      doc.superUser = true;
      let mDoc = await this.client.db('meta').collection('users').insertOne(doc)
      return mDoc;
    }
    catch(err){
      return {err}
    }
  }

  async verifySuperUser(email){
    try{
      let doc = await this.client.db("meta").collection("users").findOne({email},{superUser:1})
      if(doc?.superUser)
        return true
      else  
        return false
    }
    catch(err){
      console.log(err)
    }
  }

  async getUserId(email){
    try{
      let doc = await this.client.db("meta").collection("users").findOne({email},{_id:1})
      if(!doc) throw new Error("No such User Exist")
      return doc._id.toString()
    }
    catch(err){
      console.log(err)
    }
  }

  async verifyUser(email, passHash){
    try{
      let doc = await this.client.db('meta').collection('users').findOne({email},{passHash:1})
      if(!doc)
        return false;
      if(passHash == doc.passHash)
        return true;
      else  
        return false;
    }
    catch(err){
      return {err}
    }
  }

  async isUserSuperUser(id){
    try{
      let doc = await this.client.db("meta").collection('users').findOne({_id:ObjectId(id)},{superUser:1})
      if(!doc)
        return false;
      if(doc.superUser)
        return true;
      else  
        return false;
    }
    catch(err){
      console.log(err)
    }
  }

  async getInvitedUsers(){
    try{
      let doc = await this.client.db('meta').collection('users').aggregate([
        { $match: {superUser:{$ne:true}} },
        {
          $project: {
            _id: {
              $toString: "$_id",
            },
            name: 1,
            email: 1,
            invitationStatus:1,
            accesses:1
          }
        }
      ]).toArray()
      return doc;
    }
    catch(err){
      console.log(err)
      return {err}
    }
  }

  async getClient(){
    try{
      return await this.client.connect()
    }
    catch(err){
      console.log(err)
    }
  }

  error(err,reject){
    reject(err)
    console.log(err)
  }
}

module.exports = Mongo;