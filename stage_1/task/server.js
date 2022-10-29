const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 3000


app.get("/",(req,res)=>{
message={
"slackUsername":"Delight",
"backend":true,
"age":24,
"bio":"A student of the Federal University of Agriculture studying Electrical and Electronics Engineering. I am passionate about building solutions to problems using web technologies. I have about 3 years worth of experience in the web development space. I program with Python and JavaScript and I am familiar with frameworks such as: Django, FastApi, Express."
}
return res.status(200).json(message)
})

app.listen(PORT,()=>{
console.log(`server listening on port ${PORT}`)
})
