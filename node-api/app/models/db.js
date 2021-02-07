const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const env = "dev";
const conf = dbConfig[env];

// create connection to the database
const connection = mysql.createConnection({
	host: conf.HOST,
	user: conf.USER,
	password: conf.PASSWORD,
	database: conf.DB
});

// Open the MySQL connection
connection.connect(error => {
	if(error){ throw error; }
	
	console.log("Successfully connected to the database");
});

module.exports = connection;