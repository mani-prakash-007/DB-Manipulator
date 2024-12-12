import {
  createNewCollectionService,
  getAllCollectionService,
  getCollectionByNameService,
} from "../services/db_services.js";

export const createNewCollectionController = async (req, res) => {
  const { collectionName, collectionSchema } = req.body;
  if (!collectionName) {
    res.status(400).json({ message: `"collectionName" is required.` });
  } else if (!collectionSchema) {
    res.status(400).json({ message: `"collectionSchema" is required.` });
  } else {
    response = await createNewCollectionService(
      collectionName,
      collectionSchema
    );
    res.status(response.statusCode).json({
      status: response.status,
      message: response.details,
    });
  }
};

export const getAllCollectionController = async (req, res) => {
  const response = await getAllCollectionService();
  res.status(response.statusCode).json({
    status: response.status,
    message: response.details,
  });
};

export const getCollectionByNameController = async (req, res) => {
  const collectionName = req.params.name;
  const response = await getCollectionByNameService(collectionName);
  res.status(response.statusCode).json({
    status: response.status,
    message: response.details,
  });
};
