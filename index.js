import express from "express";
import { connectDB } from "./db.js";
import { createSchemaRouter } from "./routes/db_route.js";

const app = express();
const PORT = 3000;

//Parsing Req.Body as Json and url enocded form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect to db
connectDB();

//Main Routes
app.use("/api/db", createSchemaRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
