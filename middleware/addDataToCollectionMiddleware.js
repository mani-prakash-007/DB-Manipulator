import mongoose from "mongoose";

export const createCollectionModel = (cName, cSchema) => {
  // Check if the model already exists
  if (mongoose.models[cName]) {
    return mongoose.models[cName];
  }

  if (cSchema instanceof Map) {
    cSchema = Object.fromEntries(cSchema); // Convert Map to plain object
  }
  const collectionSchema = new mongoose.Schema(cSchema);
  return mongoose.model(cName, collectionSchema);
};
