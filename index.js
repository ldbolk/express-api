import express, { response } from "express"

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Acess-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.setHeader("Access-Control-Allow-Header", "X-Requesred-With, content-type")
    next();
})

// Variables
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


//Get
app.get("/", (req, res) => {
    res.send({page: "Homepage"})
})

app.get("/courses", (req, res) => {
    res.send(courses);
})

app.get("/courses/:id", (req, res) => {
    let searchId = parseInt(req.params.id)
    let result = courses.filter( course => course.id === searchId);
    res.send(result[0])
})

/////////////////////////////////////////////////////////////////

//POST
app.post("/courses", (req, res) => {
    console.log(req.body)
    res.send({ received: req.body })
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
    console.log(entry)
})
.catch(err => {
    console.log(err)
})

app.listen(3000, () => {
    console.log("I am alive");
})