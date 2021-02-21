const express = require("express");
const router = express.Router();
const Contacts = require("../../model/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = Contacts.getAll();
    res.json({
      status: 'success'
      code: 200
      data: {
        contacts
      }
    })
  } catch (error) {}
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
