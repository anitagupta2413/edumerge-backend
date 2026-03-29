const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Permission denied. You do not have the required role.',
        data: {}
      });
    }
    next();
  };
};

module.exports = {
  checkRole
};
