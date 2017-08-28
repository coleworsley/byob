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

  if (decoded.admin) {
    return next();
  }

  return res.status(403).json({
    error: 'You must be authorized to use this endpoint',
  });
});

const generateToken = (req, res) => {
  const payload = Object.assign({}, req.body, { admin: false });

  if (payload.email.endsWith('@turing.io')) {
    payload.admin = true;
  }

  const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '48h' });

  for (const requiredParameter of ['email', 'appName']) {
    if (!req.body[requiredParameter]) {
      return res.status(422).json({ err: `Missing ${requiredParameter}` });
    }
  }

  res.status(201).json({ token });
};

module.exports = {
  generateToken,
  checkAuth,
};
