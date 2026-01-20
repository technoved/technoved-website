require("dotenv").config();

const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

// Database
const connectDB = require("./config/database");
connectDB();

// Routes
const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");
const reviewRoutes = require("./routes/reviews");
const chatbotRoutes = require("./routes/chatbot");

const app = express();

/* =========================
   VIEW ENGINE
========================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =========================
   GLOBAL MIDDLEWARE
========================= */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* =========================
   SESSION
========================= */
app.use(
  session({
    secret: process.env.SESSION_SECRET || "technoved_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 // 1 hour
    }
  })
);

/* =========================
   FLASH MESSAGES
========================= */
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success_msg');
  res.locals.error = req.flash('error_msg');
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  next();
});


/* =========================
   ROUTES
========================= */
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/", reviewRoutes);
app.use("/", chatbotRoutes);

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).render("error", {
    title: "404",
    message: "This page is lost in another universe 🌌"
  });

});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).render("error", {
    title: "500",
    message: "Our robot broke the server again 🤕"
  });

});



/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
