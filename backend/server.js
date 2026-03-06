import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// import authRoutes from "./routes/auth.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import serviceRoutes from "./routes/service.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Debug log to confirm server receives requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
// app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Service Management Portal API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
