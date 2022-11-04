const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const task2 = require('./routes/task2.route');
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get("/", (req, res) => {
    message = {
        "slackUsername": "Delight",
        "backend": true,
        "age": 24,
        "bio": "A student of the Federal University of Agriculture studying Electrical and Electronics Engineering. I am passionate about building solutions to problems using web technologies. I have about 3 years worth of experience in the web development space. I program with Python and JavaScript and I am familiar with frameworks such as: Django, FastApi, Express."
    }
    return res.status(200).json(message)
})

app.use(task2);

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})
