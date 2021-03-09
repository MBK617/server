const error = (msg) => ({ status: 400, msg });

module.exports = {
  validateEmail: (email) => {
    let formattedEmail = email.trim().toLowerCase();
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (re.test(String(formattedEmail))) return formattedEmail;
    else throw error("Not a valid email address");
  },
  validatePassword: (password) => {
    if (password.length < 8) throw error("Password must contain at least 8 characters.");
    if (password.length >= 32) throw error("Password must contain fewer than 32 characters.");
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,31}$/;
    if (re.test(String(password))) return password;
    else throw error("Password must contain one of each of the following: uppercase letters, lowercase letters, digits 0-9");
  },
  validateName: (name) => {
    return name.trim()
  },
  validateDate: (date) => {
    let d = new Date(date)
    if(!isNaN(d.getTime())) return d.toISOString();
    else throw error("Not a valid date");
  },
  validateAccountType: (type) => {
    switch(type) {
      case'ADMIN':
      case'VOLUNTEER':
      case'GUARDIAN':
      case'CHILD':
        return type;
      default: throw error("Account type not recognized");
    }
  }
}