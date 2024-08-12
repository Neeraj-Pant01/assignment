const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors")
const authRoute = require("./routes/auth.route")
const classRoomRoute = require("./routes/classroom.route")
const timeTableRoute = require("./routes/timeTable.route");
const connection = require("./db/connection");

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/classroom',classRoomRoute)
app.use('/api/v1/timetable',timeTableRoute)

let PORT = 8000 || process.env.PORT;

app.listen(PORT,()=>{
    connection();
    console.log(`server is running at the ${PORT}`)
})