import express from "express"

const app = express();

app.get("/", (req, res) => {
    res.send({page: "Homepage"})
})

app.listen(3000, () => {
    console.log("I am alive");
})