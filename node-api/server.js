const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const cors = require("cors");

const app = express();

// parse the request of content-type: application/json
app.use(bodyParser.json());

// parse the request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin:['http://localhost:3000','http://127.0.0.1:3000']
}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  next();
});

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to REST API with MySQL application." });
});

// Add routing
require("./app/routes/expense.routes.js")(router);
app.use('/api/v1', router);

// set port, listen for requests
app.listen(8080, () => {
	console.log("Server is running on port 8080.");
});