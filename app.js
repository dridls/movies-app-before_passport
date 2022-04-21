const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

app.set("view-engine", "ejs");
// Import Routes
const routes = require("./routes/routes");

dotenv.config();

// Middlewares
app.use(express.json());

// Route Middlewares
app.use("/", routes);

//Connect to DB
mongoose.connect(process.env.DB_SERVER, () => console.log("Connected to DB"));

// await mongoose.connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }); await parseAndLoadPlanetsData();
//moviesapp

const port = 9876;
app.listen(port, () => console.log(`Server Up and running at ${port}`));
