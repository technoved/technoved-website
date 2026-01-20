const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

exports.getContact = (req, res) => {
  res.render('contact', { title: 'Contact' });
};

exports.postContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await Contact.create({ name, email, message });
    await sendEmail({ name, email, message });

    req.flash('success_msg', 'Message sent successfully!');
    res.redirect('/contact');
  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to send message');
    res.redirect('/contact');
  }
};
