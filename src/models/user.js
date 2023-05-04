class User {
  fullName;
  email;
  password;
  preferences;

  constructor({fullName, email, password, preferences}) {
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.preferences = preferences;
  }
}

module.exports = User;