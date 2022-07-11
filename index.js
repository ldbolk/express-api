import express, { request, response } from "express";
import mongo from './mongo.js';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Acess-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.setHeader("Access-Control-Allow-Header", "X-Requesred-With, content-type")
    next();
})

// Variables /////////////

const mongoUrl = "mongodb://localhost:27017"
const mongoDB = "express"
const courses = [
    { id: 1, name: "Javascript" },
    { id: 2, name: "NodeJS" },
    { id: 3, name: "Express" }
];

let course = {
    name: "Express Server API",
    level: "Intermediate",
    technology: ["JavaScript", "NodeJS", "Express", "MongoDB"]
}

let url = "http://localhost:3000/courses"


// Other /////////////



//Get /////////////
app.get("/", (req, res) => {
    mongo.list()
    .then(response => {
        res.send(response)
    })
    .catch( err => {
        res.send(err)
    })

})

app.get("/courses", (req, res) => {
    mongo.fetch("courses", null)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
    })
})

app.get("/courses/:id", (req, res) => {
    mongo.fetch("courses", req.params.id)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
    })
})

/////////////////////////////////////////////////////////////////

//POST
app.post("/courses", (req, res) => {
    let data = req.body;
    mongo.create("courses", data)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        response.send(err)
    })
})


// PUT
/////////////////////////////////////////////////////////////////

app.put("/courses/:id", (req, res) => {
    let searchId = parseInt(req.params.id)
    res.send({ id: searchId, received: req.body })
})

// DELETE
/////////////////////////////////////////////////////////////////

app.delete("/courses/:id", (req, res) => {
    let searchId = parseInt(req.params.id)
    res.send({ id: searchId, deleted: true })
})

////////////////////////////////////////////////////////////////

fetch(url, {
    method: "POST",
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(course)
})
.then(entry => entry.json())
.then(entry => {
    //console.log(entry)
})
.catch(err => {
    console.log(err)
})

//////////////////////////////////////////////////////////////

app.listen(3000, () => {
    console.log("I am alive");
})