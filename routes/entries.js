var express = require("express");
var router = express.Router();
db = require("../model/helper.js");

// GET home page
router.get("/", (req, res) => {
  res.status(201).send("Welcome to the Journal App!");
});

// GET all entries
router.get("/entries", async (req, res) => {
  try {
    let result = await db("SELECT * FROM entries ORDER BY created_at DESC");
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET one entry
router.get("/entries/:id", async (req, res) => {
  let entryId = Number(req.params.id);

  try {
    let result = await db(`SELECT * FROM entries WHERE id = ${entryId}`);
    if (result.data.length === 1) {
      res.status(201).send(result.data);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST new entry
router.post("/entries", async (req, res) => {
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  }

  let user_id = 1;
  let created_at = formatDate(new Date());
  let { question, content, mood } = req.body;

  let checkDuplicateDate = `
    SELECT * FROM entries
    WHERE created_at = "${created_at}"
  `;

  try {
    let duplicateCheckResult = await db(checkDuplicateDate);
    if (duplicateCheckResult.data.length > 0) {
      res.status(404).send({ redirect: true });
    } else {
      let sql = `
        INSERT INTO entries (user_id, question, content, mood, created_at)
        VALUES (${user_id}, "${question}", "${content}", ${mood}, "${created_at}")
      `;

      await db(sql);
      let result = await db("SELECT * FROM entries ORDER BY created_at DESC");
      res.status(201).send(result.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// UPDATE an entry
router.patch("/entries/:id", async (req, res) => {
  let entryId = Number(req.params.id);

  try {
    let result = await db(`SELECT * FROM entries WHERE id = ${entryId}`);
    if (result.data.length === 1) {
      let { content } = req.body;
      let sql = `
        UPDATE entries
        SET content = "${content}"
        WHERE id = ${entryId}
      `;
      await db(sql);
      result = await db("SELECT * FROM entries ORDER BY created_at DESC");
      res.status(201).send(result.data);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE an entry
router.delete("/entries/:id", async (req, res) => {
  let entryId = Number(req.params.id);

  try {
    let result = await db(`SELECT * FROM entries WHERE id = ${entryId}`);
    if (result.data.length === 1) {
      await db(`DELETE FROM entries WHERE id = ${entryId}`);
      result = await db("SELECT * FROM entries ORDER BY created_at DESC");
      res.status(201).send(result.data);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;