var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  let i = fetch("http://localhost:3000/impresora");
  res.render("index", { title: "Express" });
});

module.exports = router;
