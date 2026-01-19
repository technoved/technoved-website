const Quote = require('../models/Quote');
const Contact = require('../models/Contact');
const Project = require('../models/project');


/* =========================
   LOGIN PAGE
========================= */
exports.getLogin = (req, res) => {
  res.render('admin/login', {
    title: 'Admin Login'
  });
};

/* =========================
   LOGIN LOGIC
========================= */
exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.isAuthenticated = true;
    req.flash('success_msg', 'Welcome Admin');
    return res.redirect('/admin/dashboard');
  }

  req.flash('error_msg', 'Invalid credentials');
  res.redirect('/admin/login');
};

/* =========================
   DASHBOARD
========================= */
exports.getDashboard = async (req, res) => {
  try {
    const totalQuotes = await Quote.countDocuments();
    const totalContacts = await Contact.countDocuments();

    const monthlyQuotes = await Quote.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      totalQuotes,
      totalContacts,
      target: 10,
      monthlyQuotes
    });

  } catch (err) {
    console.error(err);
    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      totalQuotes: 0,
      totalContacts: 0,
      target: 10,
      monthlyQuotes: []   // ✅ fallback HERE
    });
  }
};


/* =========================
   QUOTES PAGE
========================= */
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });

    res.render('admin/quotes', {
      title: 'Quote Requests',
      quotes
    });

  } catch (error) {
    console.error('Quotes Error:', error);

    res.render('admin/quotes', {
      title: 'Quote Requests',
      quotes: []
    });
  }
};
exports.updateQuoteStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Quote.findByIdAndUpdate(id, { status });
    res.redirect('/admin/quotes');
  } catch (error) {
    console.error(error);
    res.redirect('/admin/quotes');
  }
};
exports.createProjectFromQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      req.flash('error_msg', 'Quote not found');
      return res.redirect('/admin/quotes');
    }

    await Project.create({
      clientName: quote.name,
      email: quote.email,
      phone: quote.phone,
      serviceType: quote.serviceType
    });

    await Quote.findByIdAndUpdate(quote._id, {
      status: 'Completed'
    });

    req.flash('success_msg', 'Project created successfully');
    res.redirect('/admin/projects');

  } catch (err) {
    console.error(err);
    req.flash('error_msg', 'Failed to create project');
    res.redirect('/admin/quotes');
  }
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.render('admin/project', {
    title: 'Projects',
    projects
  });
};
exports.deleteQuote = async (req, res) => {
  try {
    const quoteId = req.params.id;

    console.log('DELETE QUOTE ID:', quoteId); // 🔍 DEBUG

    await Quote.findByIdAndDelete(quoteId);

    req.flash('success_msg', 'Quote deleted successfully');
    res.redirect('/admin/quotes');
  } catch (error) {
    console.error('Delete Quote Error:', error);
    req.flash('error_msg', 'Failed to delete quote');
    res.redirect('/admin/quotes');
  }
};

/* =========================
   CONTACTS PAGE
========================= */
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.render('admin/contacts', {
      title: 'Contact Messages',
      contacts
    });

  } catch (error) {
    console.error('Contacts Error:', error);

    res.render('admin/contacts', {
      title: 'Contact Messages',
      contacts: []
    });
  }
};

/* =========================
   LOGOUT
========================= */
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};
