import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    locationType: {
      type: String,
      enum: ["HOSTEL", "COLLEGE"],
      required: true,
    },

    block: {
      type: String,
      trim: true,
    },

    roomNumber: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Electrical",
        "Plumbing",
        "Carpentry",
        "Internet",
        "Cleaning",
        "Other",
      ],
      required: true,   // 🔥 make it required (you always send it)
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "URGENT"],
      default: "MEDIUM",
    },

    image: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["REQUESTED", "ASSIGNED", "IN_PROGRESS", "COMPLETED"],
      default: "REQUESTED",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ServiceRequest", serviceSchema);