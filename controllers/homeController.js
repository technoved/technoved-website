const Review = require("../models/Reviews");

exports.getHome = (req, res) => {
  res.render('index', { title: 'Home' });
};

exports.getServices = (req, res) => {
  res.render('services', { title: 'Services' });
};

exports.getPortfolio = (req, res) => {
  res.render('portfolio', { title: 'Portfolio' });
};



exports.getAbout = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.render("about", {
      title: "About",
      reviews: reviews || [] // ✅ ALWAYS DEFINED
    });

  } catch (error) {
    console.error("About page error:", error);

    // ✅ Even if DB fails, page still loads
    res.render("about", {
      title: "About",
      reviews: []
    });
  }
};

