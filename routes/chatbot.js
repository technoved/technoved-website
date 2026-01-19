const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const faqPath = path.join(__dirname, "../data/chatabot.json");
const faqData = JSON.parse(fs.readFileSync(faqPath, "utf8"));

router.post("/chat", (req, res) => {
  const userMsg = (req.body.message || "").toLowerCase();

  for (let item of faqData) {
    for (let key of item.keywords) {
      if (userMsg.includes(key)) {
        return res.json({ reply: item.answer });
      }
    }
  }

  res.json({
    reply: "Sorry, I didn’t understand. Please try another question."
  });
});

module.exports = router;
