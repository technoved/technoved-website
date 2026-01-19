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
      monthlyQuotes   // ✅ MUST exist
    });

  } catch (error) {
    console.error('Dashboard Error:', error);

    res.render('admin/dashboard', {
      title: 'Admin Dashboard',
      totalQuotes: 0,
      totalContacts: 0,
      target: 10,
      monthlyQuotes: []  // ✅ ALWAYS provide fallback HERE
    });
  }
};
