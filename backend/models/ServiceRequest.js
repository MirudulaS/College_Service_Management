import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },
    status: {
      type: String,
      enum: ["REQUESTED", "ASSIGNED", "IN_PROGRESS", "COMPLETED"],
      default: "REQUESTED",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("ServiceRequest", serviceSchema);