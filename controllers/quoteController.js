const Quote = require('../models/Quote');

// SHOW QUOTE PAGE
exports.getQuote = (req, res) => {
  res.render('quote', {
    title: 'Request a Quote'
  });
};

// SAVE QUOTE
exports.postQuote = async (req, res) => {
  try {
    console.log('📥 Incoming Quote:', req.body); // DEBUG

    const { name, email, phone, serviceType, budget } = req.body;

    const newQuote = new Quote({
      name,
      email,
      phone,
      serviceType,
      budget
    });

    await newQuote.save(); // 🔴 THIS IS CRITICAL

    console.log('✅ Quote saved successfully');

    req.flash('success_msg', 'Quote submitted successfully!');
    res.redirect('/quote');
  } catch (error) {
    console.error('❌ Error saving quote:', error);

    req.flash('error_msg', 'Failed to submit quote');
    res.redirect('/quote');
  }
};
