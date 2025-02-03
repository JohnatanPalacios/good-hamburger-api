require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const { seedDatabase } = require("./config/seedDatabase");

const app = express();

const initializeApp = async () => {
  try {
    // DB connection
    await connectDB();
    // Load data
    await seedDatabase();

    // CORS
    app.use(cors());

    // Middleware
    app.use(express.static("public")); // Static files
    app.use(express.json()); // Read and parser body

    // Routes
    app.use("/api/menu", require("./routes/menu"));
    app.use("/api/menu", require("./routes/extras"));
    app.use("/api/orders", require("./routes/orders"));
    app.use("/api/menu", require("./routes/sandwiches"));

    // Run server
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize application:", error);
    process.exit(1);
  }
};

// Start App
initializeApp();
