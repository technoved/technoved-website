const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { isAuthenticated, isGuest } = require('../middleware/auth');
const Contact = require('../models/Contact');

/* ===============================
   AUTH ROUTES
================================ */

// Login
router.get('/login', isGuest, adminController.getLogin);
router.post('/login', isGuest, adminController.postLogin);

// Logout
router.get('/logout', isAuthenticated, adminController.logout);


/* ===============================
   ADMIN DASHBOARD
================================ */

router.get('/dashboard', isAuthenticated, adminController.getDashboard);

/* ===============================
   DATA PAGES
================================ */

// Quotes
router.get('/quotes', isAuthenticated, adminController.getQuotes);
router.post(
  '/quotes/status/:id',
  isAuthenticated,
  adminController.updateQuoteStatus
);
router.post(
  '/quotes/delete/:id',
  isAuthenticated,
  adminController.deleteQuote
);

router.post(
  '/quotes/convert/:id',
  isAuthenticated,
  adminController.createProjectFromQuote
);

router.get(
  '/projects',
  isAuthenticated,
  adminController.getProjects
);


// Contacts
router.get('/contacts', isAuthenticated, adminController.getContacts);

/* ===============================
   DELETE CONTACT
================================ */

router.post('/contacts/delete/:id', isAuthenticated, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Contact deleted successfully');
    res.redirect('/admin/contacts');
  } catch (error) {
    console.error('Delete Contact Error:', error);
    req.flash('error_msg', 'Failed to delete contact');
    res.redirect('/admin/contacts');
  }
});

module.exports = router;
