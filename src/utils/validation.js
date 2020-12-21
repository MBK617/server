module.exports = {
  validateEmail: (email) => {
    let formattedEmail = email.trim().toLowerCase();
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (re.test(String(formattedEmail))) return formattedEmail;
    else throw { status: 400, msg:"Not a valid email address" };
  },
  validatePassword: (password) => {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    if (re.test(String(password))) return password;
    else throw { status: 400, msg:"Password must contain one of each of the following: uppercase letters, lowercase letters, digits 0-9"};
  },
  validateName: (name) => {
    return name.trim()
  },
  validateDate: (date) => {
    let d = new Date(date)
    if(!isNaN(d.getTime())) return d.toISOString();
    else throw { status: 400, msg:"Not a valid date"};
  },
  validateAccountType: (type) => {
    switch(type) {
      case'ADMIN':
      case'VOLUNTEER':
      case'GUARDIAN':
      case'CHILD':
        return type;
      default: throw { status: 400, msg:"Account type not recognized"};
    }
  }
}