import { MongoClient, ObjectId } from "mongodb";

const mongoUrl = "mongodb://localhost:27017";
const mongoDB = "express";

// Returns a list of all databases
export default class mongo {

    static delete = (collection, id) => new Promise((resolve, reject) => {
        let query = { _id: new ObjectId(id) }

        MongoClient.connect(mongoUrl, (err, client) => {
            if(err) {
                reject({ error: err })
            }
            let db = client.db(mongoDB)

            db.collection(collection)
            .deleteOne(query, (err, result) => {
                client.close()
                if(err) {
                    reject({ error: err })
                }
                resolve({ _id: id, deleted: true })
            })
        })
    })

    static update = (collection, id, data) => 
        new Promise((resolve, reject) => {
            let query = { _id: new ObjectId(id) }
            let newData = { $set: data }

            MongoClient.connect(mongoUrl, (err, client) => {
                if(err) {
                    reject({ error: err })
                }
                let db = client.db(mongoDB)

                db.collection(collection)
                .updateOne(query, newData, (err, result) => {
                    client.close()
                    if(err) {
                        reject({ error:err })
                    }
                    resolve({ _id: id, updated: true})
                })
            })
        })

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

    static collectionsDB = (database) => new Promise( (resolve, reject) => {

        MongoClient.connect(mongoUrl, (err, client) => {
            if(err) {
                console.log("Database probably doesn't exist")
                reject({ error: err });
            }
            // database = 'express' ////////////////////////

            let db = client.db(database);
            db.collections((err, result) => {
                if(result[0] == undefined) {
                    reject({ error: "Database doesn't exist or doesn't contain collections"})
                }
                client.close()
                if(err) {
                    reject({ error: err })
                }
                let list = []
                result.forEach(element => {
                    list.push(element.collectionName)
                });
                result = list
                resolve(result)
            });
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