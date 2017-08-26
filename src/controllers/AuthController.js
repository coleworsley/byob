const jwt = require('jsonwebtoken');

const checkAuth = ((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      error: 'You must be authorized to use this endpoint',
    });
  }

  let decoded = '';

  try {
    decoded = jwt.verify(token, process.env.SECRETKEY);
  } catch (error) {
    return res.status(403).json({
      error: 'Invalid token',
    });
  }

  return next();
});

const generateToken = (req, res) => {
  const payload = req.body;

  const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '48h' });

  res.status(201).json({ token });
};

module.exports = {
  generateToken,
  checkAuth,
};
