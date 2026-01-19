exports.isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) return next();
  res.redirect('/admin/login');
};

exports.isGuest = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return res.redirect('/admin/dashboard');
  }
  next();
};
