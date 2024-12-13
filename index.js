import express from "express";
import { connectDB } from "./db.js";
import { createSchemaRouter } from "./routes/dbCreateRoute.js";
import { addDataToCollectionRoute } from "./routes/dbAddDataRoute.js";

const app = express();
const PORT = 3000;

//Parsing Req.Body as Json and url enocded form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect to db
connectDB();

//Main Routes
app.use("/api/db/create", createSchemaRouter);
app.use("/api/db/add", addDataToCollectionRoute);

//Server is listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
