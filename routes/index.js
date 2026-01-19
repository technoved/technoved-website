const express = require('express');
const router = express.Router();
// const homeController = require("../controllers/homeController");
/* =========================
   CONTROLLERS
========================= */
const homeController = require('../controllers/homeController');
const contactController = require('../controllers/contactController');
const quoteController = require('../controllers/quoteController');

/* =========================
   VALIDATION MIDDLEWARE
========================= */
const {
  contactValidation,
  quoteValidation,
  handleValidation
} = require('../middleware/validation');

/* =========================
   HOME ROUTES
========================= */
router.get('/', homeController.getHome);
router.get('/services', homeController.getServices);
router.get('/portfolio', homeController.getPortfolio);
router.get('/about', homeController.getAbout);
router.get("/about", homeController.getAbout);

/* =========================
   CONTACT ROUTES
========================= */
router.get('/contact', contactController.getContact);
router.post(
  '/contact',
  contactValidation,
  handleValidation,
  contactController.postContact
);
router.post(
  '/contact',
  contactValidation,
  handleValidation,
  contactController.postContact
);

/* =========================
   QUOTE ROUTES (PUBLIC)
========================= */
router.get('/quote', quoteController.getQuote);
router.post(
  '/quote',
  quoteValidation,
  handleValidation,
  quoteController.postQuote
);

/* =========================
   EXPORT
========================= */
module.exports = router;
