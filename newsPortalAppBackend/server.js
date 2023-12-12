import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnection from "./config/database.js";
import "dotenv/config.js";
import router from "./routes/index.js";

const app = express();
const port = 3002;
dbConnection();

app.use(cors({ credentials: true, origin: "http://localhost:5173" })); //can add options credentials : true , origin: your port
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`server running at port ${port}`));
