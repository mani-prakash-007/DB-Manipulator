import express from "express";
import {
  createNewCollectionController,
  getAllCollectionController,
  getCollectionByNameController,
} from "../controllers/db_controller.js";

export const createSchemaRouter = express.Router();

//Create New Collection
createSchemaRouter.post("/", createNewCollectionController);

//Get Collection by Collection name
createSchemaRouter.get("/:name", getCollectionByNameController);

//Get All Collections from Database
createSchemaRouter.get("/", getAllCollectionController);
