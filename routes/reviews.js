const express = require("express");
const router = express.Router();
const Review = require("../models/Reviews");

/* SHOW REVIEW FORM */
router.get("/review", (req, res) => {
  res.render("reviews");
});

/* ADD REVIEW TO DATABASE */
router.post("/review", async (req, res) => {
  try {
    const { name, role, message, rating } = req.body;

    await Review.create({
      name,
      role,
      message,
      rating
    });

    req.flash("success", "Thank you for your review!");
    res.redirect("/about");
  } catch (error) {
    req.flash("error", "Something went wrong");
    res.redirect("/reviews");
  }
});

module.exports = router;
