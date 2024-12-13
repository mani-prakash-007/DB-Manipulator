import { addDataToCollectionService } from "../services/dbAddDataService.js";

export const addDataToCollectionController = async (req, res) => {
  const collectionName = req.params.name;
  const { collectionData } = req.body;

  const response = await addDataToCollectionService(
    collectionName,
    collectionData
  );
  res.status(response.statusCode).json({
    status: response.status,
    message: response.details,
  });
};
