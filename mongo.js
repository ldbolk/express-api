import { MongoClient, ObjectId } from "mongodb";

const mongoUrl = "mongodb://localhost:27017";
const mongoDB = "express";

// Returns a list of all databases
export default class mongo {

    static fetch = (collection, id) => new Promise( (resolve, reject) => {
        let query = id ? { _id: new ObjectId(id) } : {}

        MongoClient.connect(mongoUrl, (err, client) => {
            if(err) {
                reject({ error: err })
            }
            let db = client.db(mongoDB)
    
            db.collection(collection).find(query).toArray((err, result) => {
                client.close()
                if(err) {
                    reject({ error: err})
                }
                resolve(result)
            })
        })
    })

    static create = (collection, data) => new Promise( (resolve, reject) => {
        MongoClient.connect(mongoUrl, (err, client) => {
            if(err) {
                reject({ error: err })
            }

            let db = client.db(mongoDB)

            db.collection(collection).insertOne(data, (err, result) => {
                client.close()
                if(err) {
                    reject({ error: err })
                }
                resolve(result)
            })
        })
    })

    static list = () => new Promise ( (resolve, reject) => {
        MongoClient.connect(mongoUrl, (err, client) => {
            if (err) {
                reject({ error: err })
            }
            let adminDb = client.db(mongoDB).admin()
            adminDb.listDatabases((err, result) => {
                client.close()
                if(err) {
                    reject({ error: err })
                }
                resolve(result.databases)
            })
        })
    })
}