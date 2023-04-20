var mysql = require("mysql");
var db = mysql.createConnection({
  host: "localhost",
  database: "copisteria",
  user: "root",
  password: "",
  port: 3306,
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
