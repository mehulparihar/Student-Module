import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import studentRoute from "./routes/student.route.js"
dotenv.config();


const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use("/api/students", studentRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server running on port " + PORT);
})