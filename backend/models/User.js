import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["ADMIN", "USER", "SERVICE_PROVIDER"],
      default: "USER",
    },

    // 🔥 NEW PROFILE FIELDS
    userType: {
      type: String,
      enum: ["HOSTELLER", "DAY_SCHOLAR"],
    },

    department: {
      type: String,
    },

    roomNumber: {
      type: String,
    },

    profilePhoto: {
      type: String,
    },

    availability: [
      {
        date: Date,
        slots: [String] // ["9AM", "11AM", "2PM"]
      }
    ],

    specialization: {
      type: String,
      enum: ["Electrical", "Plumbing", "Internet", "Cleaning", "Carpentry"],
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);