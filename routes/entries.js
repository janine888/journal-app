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
    let result = await db("SELECT * FROM entries ORDER BY created_at ASC");
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
  let { user_id, content, mood, created_at } = req.body;
  let sql = `
    INSERT INTO entries (user_id, content, mood, created_at)
    VALUES (${user_id}, "${content}", ${mood}, "${created_at}")
  `;

  try {
    await db(sql);
    let result = await db("SELECT * FROM entries");
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// UPDATE an entry
router.put("/entries/:id", async (req, res) => {
  let entryId = Number(req.params.id);

  try {
    let result = await db(`SELECT * FROM entries WHERE id = ${entryId}`);
    if (result.data.length === 1) {
      let { user_id, content, mood, created_at } = req.body;
      let sql = `
        UPDATE entries
        SET user_id = ${user_id}, content = "${content}", mood = ${mood}, created_at = "${created_at}"
        WHERE id = ${entryId}
      `;
      await db(sql);
      result = await db("SELECT * FROM entries");
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
      result = await db("SELECT * FROM entries");
      res.status(201).send(result.data);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;