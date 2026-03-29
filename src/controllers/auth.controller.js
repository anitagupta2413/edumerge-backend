const authService = require('../services/auth.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        data: {}
      });
    }

    const userData = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: userData
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
};

const getMe = async (req, res) => {
  try {
    // req.user is populated by verifyToken middleware
    res.status(200).json({
      success: true,
      message: 'User session verified',
      data: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
        name: req.user.name
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve session info',
      data: {}
    });
  }
};

module.exports = {
  login,
  getMe
};
