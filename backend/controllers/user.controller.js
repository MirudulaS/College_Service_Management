import User from "../models/User.js";

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user role (Admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    const allowedRoles = ["ADMIN", "USER", "SERVICE_PROVIDER"];

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 FIXED PROFILE UPDATE
export const updateProfile = async (req, res) => {
  try {
    // 🚨 If auth middleware fails, this will be undefined
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updateData = {
      userType: req.body.userType,
      department: req.body.department,
      roomNumber: req.body.roomNumber,
    };

    if (req.file) {
      updateData.profilePhoto = req.file.filename;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProvidersByCategory = async (req, res) => {
  try {

    const { category } = req.params;

    const providers = await User.find({
      role: "SERVICE_PROVIDER",
      category: category
    }).select("-password");

    res.json(providers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProviders = async (req, res) => {
  try {

    const providers = await User.find({
      role: "SERVICE_PROVIDER"
    }).select(
      "name email specialization availability"
    );

    res.json(providers);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};