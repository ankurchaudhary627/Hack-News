const express = require("express");
const mongoose = require("mongoose");
// const MongoClient = require("mongodb").MongoClient;

const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const challenges = require("./routes/api/challenges");

const app = express();

// Body-parser Middleware
app.use(bodyParser.json());

// DB_config
const dbURI = require("./config/keys").mongoURI;

// connect to mongo
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/users", users);
app.use("/api/challenges", challenges);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on PORT ${port}`));
