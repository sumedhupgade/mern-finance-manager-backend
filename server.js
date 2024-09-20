const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/user", require("./api/controllers/userRoutes"));
app.use("/transactions", require("./api/controllers/transactionRoutes"));
app.use("/auth", require("./api/controllers/authRoutes"));
app.use("/recurring-expenses", require("./api/controllers/recurringExpenseRoutes"));
app.use("/debt", require("./api/controllers/debtRoutes"));


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// sumedh225109 OrL9s7VnRpjNXY2A
