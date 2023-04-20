const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM impresora", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM impresora WHERE id = ?", [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { negro, cian, amarillo, magenta } = req.body[0];
  console.log(req.body);
  db.query(
    "UPDATE impresora SET negro=?, cian=?, amarillo=?, magenta=? WHERE id = ?",
    [negro, cian, amarillo, magenta, id],
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

module.exports = router;
