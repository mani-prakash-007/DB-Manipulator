import mongoose from "mongoose";

const collectionSchema = mongoose.Schema(
  {
    collectionName: {
      type: String,
      required: true,
      unique: true,
    },
    collectionSchema: {
      type: Map,
      of: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DB-Schemas", collectionSchema);
