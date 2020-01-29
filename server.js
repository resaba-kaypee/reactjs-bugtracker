const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect DB
connectDB();

// Init middleware
app.use(express.json({ extented: false }));

// Static files
app.use(express.static("./client/src"));

// Define routes

app.use("/api/admin", require("./routes/admin"));
app.use("/api/admin/update", require("./routes/admin"));
app.use("/api/admin/issues", require("./routes/admin"));
app.use("/api/admin/registerAdmin", require("./routes/admin"));
app.use("/api/admin/registerUser", require("./routes/admin"));
// app.use("/api/admin/project", require("./routes/admin"));
app.use("/api/authAdmin", require("./routes/authAdmin"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth/logout", require("./routes/auth"));
app.use("/api/issues", require("./routes/issues"));
app.use("/api/logs", require("./routes/logs"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
