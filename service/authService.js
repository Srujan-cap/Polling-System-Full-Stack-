const db = require('../data/db');

class AuthService {
  login(username, password) {
    const user = db.users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return { id: user.id, username: user.username };
  }
}

module.exports = new AuthService();