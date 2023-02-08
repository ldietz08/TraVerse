const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: `${process.env.user}`,
  password: `${process.env.password}`,
  database: "TraVerseDB",
});

db.connect((err) => {
  if (!err) {
    console.log("Successful");
  } else {
    console.log("Failed");
  }
});

module.exports = db;
