const { body, validationResult } = require('express-validator');

/* ======================
   CONTACT VALIDATION
====================== */
exports.contactValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
];

/* ======================
   QUOTE VALIDATION (FIXED)
====================== */
exports.quoteValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required'),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required'),

  body('serviceType')
    .trim()
    .notEmpty()
    .withMessage('Service type is required'),

  // ✅ Budget is OPTIONAL
  body('budget')
    .optional()
    .trim()
];

/* ======================
   HANDLE VALIDATION
====================== */
exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    req.flash('error_msg', errors.array()[0].msg);
    return res.redirect('back');
  }

  next();
};
