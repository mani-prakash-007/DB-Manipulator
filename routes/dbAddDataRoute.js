import express from "express";
import { addDataToCollectionController } from "../controllers/dbAddDataController.js";

export const addDataToCollectionRoute = express.Router();

//Add Data to the Specific Collection
addDataToCollectionRoute.post("/:name", addDataToCollectionController);
