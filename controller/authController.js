const authService = require('../service/authService');

exports.login = (req, res) => {
  try {
    const { username, password } = req.body;

    const user = authService.login(username, password);

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};