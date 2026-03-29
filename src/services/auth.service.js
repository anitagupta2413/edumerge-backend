const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found.');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error('Invalid Password.');
  }

  // Generate token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || 'supersecretjwtkey_for_edumerge',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken: token
  };
};

module.exports = {
  login
};
