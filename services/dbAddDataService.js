import { createCollectionModel } from "../middleware/addDataToCollectionMiddleware.js";
import { getCollectionByNameService } from "./dbCreateServices.js";

export const addDataToCollectionService = async (
  collectionName,
  collectionData
) => {
  try {
    const collectionSchemaDetails = await getCollectionByNameService(
      collectionName
    );
    if (collectionSchemaDetails.statusCode != 200) {
      return {
        statusCode: collectionSchemaDetails.statusCode,
        status: collectionSchemaDetails.status,
        details: collectionSchemaDetails.details,
      };
    }
    const Collection = createCollectionModel(
      collectionSchemaDetails.details.collectionName,
      collectionSchemaDetails.details.collectionSchema
    );

    const newData = await Collection.create(collectionData);
    return {
      statusCode: 200,
      status: `Data added to "${collectionName}" collection`,
      details: newData,
    };
  } catch (error) {
    if (error.name === "ValidationError") {
      // Mongoose validation errors
      return {
        statusCode: 400,
        status: "Validation Error",
        details: error.message,
      };
    } else if (error.code === 11000) {
      // Mongoose unique field conflict (duplicate key error)
      return {
        statusCode: 409,
        status: "Conflict: Duplicate Key",
        details: error.message,
      };
    } else {
      // General errors
      return {
        statusCode: 500,
        status: "Internal Server Error",
        details: error.message,
      };
    }
  }
};
