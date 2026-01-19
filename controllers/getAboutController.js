exports.getAbout = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });

    res.render("about", {
      reviews, // 👈 VERY IMPORTANT
    });
  } catch (error) {
    console.error(error);
    res.render("about", {
      reviews: [], // fallback to avoid crash
    });
  }
};
