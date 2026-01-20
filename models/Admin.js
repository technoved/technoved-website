const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { isAuthenticated, isGuest } = require('../middleware/auth');

// Login routes
router.get('/login', isGuest, adminController.getLogin);
router.post('/login', adminController.postLogin);

// Protected admin routes
router.get('/dashboard', isAuthenticated, adminController.getDashboard);
router.get('/contacts', isAuthenticated, adminController.getContacts);
router.get('/quotes', isAuthenticated, adminController.getQuotes);

// Logout
router.get('/logout', adminController.logout);

module.exports = router;
