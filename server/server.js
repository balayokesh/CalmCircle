if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");

// Middleware
const allowedOrigin = process.env.FRONTEND_URL;
const corsOptions = {
  origin: allowedOrigin,
  credentials: true, // Allow credentials (cookies) to be sent
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Configure routes
const indexRouter = require("./routes/index");
const moodRoutes = require("./routes/mood");
app.use("/", indexRouter);
app.use("/mood", moodRoutes);

// Connect database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Mongoose"));

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
