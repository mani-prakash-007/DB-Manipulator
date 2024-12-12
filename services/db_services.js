import Collection from ".././models/db_schema.js";

export const createNewCollectionService = async (
  collectionName,
  collectionSchema
) => {
  try {
    let newCollection = await Collection.create({
      collectionName,
      collectionSchema,
    });
    return {
      statusCode: 200,
      status: "Collection Created",
      details: newCollection,
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

export const getAllCollectionService = async () => {
  try {
    const collections = await Collection.find();
    return {
      statusCode: 200,
      status: "Collection Fetched",
      details: collections == [] ? "No Collections available" : collections,
    };
  } catch (error) {
    if (error.name === "MongoNetworkError") {
      // Database connection error
      return {
        statusCode: 503,
        status: "Service Unavailable",
        details: "Database connection error.",
      };
    } else {
      // General or unexpected error
      return {
        statusCode: 500,
        status: "Internal Server Error",
        details: error.message,
      };
    }
  }
};

export const getCollectionByNameService = async (collectionName) => {
  try {
    const collection = await Collection.findOne({
      collectionName: { $regex: collectionName, $options: "i" },
    });
    return {
      statusCode: 200,
      status: "Collection Fetched",
      details:
        collection == null
          ? `No Collection found for "${collectionName}"`
          : collection,
    };
  } catch (error) {
    if (error.name === "MongoNetworkError") {
      // Database connection error
      return {
        statusCode: 503,
        status: "Service Unavailable",
        details: "Database connection error.",
      };
    } else {
      // General or unexpected error
      return {
        statusCode: 500,
        status: "Internal Server Error",
        details: error.message,
      };
    }
  }
};
