const { validateEmail, validatePassword, validateName, validateAccountType, validateDate } = require("../validation");

describe('input validation', () => {
  it('should format email and return when valid', () => {
    expect(validateEmail(' email@email.com')).toEqual('email@email.com');
  });

  it('should throw error if invalid email address', () => {
    expect(() => {
      validateEmail('not an email address')
    }).toThrow();
    expect(() => {
      validateEmail('email.com')
    }).toThrow();
    expect(() => {
      validateEmail('something@email.')
    }).toThrow();
  });

  it('should return password as is when valid', () => {
    expect(validatePassword('Password123')).toEqual('Password123');
  });

  it('should throw error if invalid password', () => {
    expect(() => {
      validatePassword('password')
    }).toThrow();
    expect(() => {
      validatePassword('Password!')
    }).toThrow();
    expect(() => {
      validatePassword('password123')
    }).toThrow();
    expect(() => {
      validatePassword('Pass1')
    }).toThrow();
    expect(() => {
      validatePassword('PasswordThatIsSoUnbelievablyLong123')
    }).toThrow();
  });

  it('should return formatted name', () => {
    expect(validateName('Abby ')).toEqual('Abby');
    expect(validateName('Abby')).toEqual('Abby');
  });

  it('should return formatted Date', () => {
    expect(validateDate('1998-06-19T06:00:00.000Z')).toEqual('1998-06-19T06:00:00.000Z');
  });

  it('should throw error if date is invalid', () => {
    expect(() => {
      validateDate('Not a date')
    }).toThrow();
  })
  
  it('should return account type', () => {
    expect(validateAccountType('ADMIN')).toEqual('ADMIN');
    expect(validateAccountType('VOLUNTEER')).toEqual('VOLUNTEER');
    expect(validateAccountType('GUARDIAN')).toEqual('GUARDIAN');
    expect(validateAccountType('CHILD')).toEqual('CHILD');
  });

  it('should throw error if invalid account type', () => {
    expect(() => {
      validateAccountType('Not an account type')
    }).toThrow();
  });
})