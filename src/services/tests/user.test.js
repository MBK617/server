// jest.mock('database')
const { UserService } = require('../../services');
const Database = require('../../database');

process.env.SECRET = "secret!"
jest.mock('../../database');

describe('user service test', () => {

  describe('user in system', () => {
    beforeEach(() => {
      Database.User.createUser.mockImplementation((user, callback) => callback());
      Database.User.getUser.mockImplementation((query, projection, callback) => callback(undefined, {
        salt: 'salt',
        _id: 'id',
        password: '1c8e432462648d825ade4983da4b1c9cc231180d3dd0e77b0cfe0b28c5e2f2b39aa3adabfcd5e1fe968b9e815005cf67499c30177f4c0199e39064ceaa5adefa',
      }));
      Database.User.updateUser.mockImplementation((query, data, callback) => callback())
    });

    it('should generate token on login call', (done) => {
      UserService.logIn({
        userEmail: "email@email.com",
        userPassword: "password"
      }, (err, token) => {
        expect(token).toBeTruthy()
        done();
      });
    });

    it('should error on login with bad password', (done) => {
      UserService.logIn({
        userEmail: "email@email.com",
        userPassword: "wrong_password"
      }, (err, token) => {
        expect(err).toEqual({ status: 401, msg: "Unauthorized" })
        done();
      });
    });

    it('should fail to sign up new user', (done) => {
      UserService.signUp({
        userEmail: "email@email.com",
        userPassword: "password",
        userFirstName: "Example",
        userLastName: "User",
        userBirthday: Date.now().toString(),
        userAccountType: 'ADMIN'
      }, (err) => {
        expect(err).toEqual({ status: 400, msg: 'Email already in system' })
        done();
      });
    });

    it('should succeed on password change', (done) => {
      UserService.changePassword({
        userId: "twelvechars!",
        userNewPassword: "newPassword"
      }, (err) => {
        expect(err).toBeFalsy()
        done();
      });
    });
  });
  
  describe('user not in system', () => {
    beforeEach(() => {
      Database.User.createUser.mockImplementation((user, callback) => callback());
      Database.User.getUser.mockImplementation((query, projection, callback) => callback(undefined, null));
      Database.User.updateUser.mockImplementation((query, data, callback) => callback({ status: 404, msg: "User not found" }))
    });
    
    it('should generate token on login call', (done) => {
      UserService.logIn({
        userEmail: "email@email.com",
        userPassword: "password"
      }, (err) => {
        expect(err).toEqual({ status: 404, msg: "User not found" })
        done();
      });
    });

    it('should sign up new user successfully', (done) => {
      UserService.signUp({
        userEmail: "email@email.com",
        userPassword: "password",
        userFirstName: "Example",
        userLastName: "User",
        userBirthday: Date.now().toString(),
        userAccountType: 'ADMIN'
      }, (err) => {
        expect(err).toBeFalsy();
        done();
      });
    }) 

    it('should succeed on password change', (done) => {
      UserService.changePassword({
        userId: "twelvechars!",
        userNewPassword: "newPassword"
      }, (err) => {
        expect(err).toEqual({ status: 404, msg: "User not found" })
        done();
      });
    });
  });

  describe('database errors', () => {
    beforeEach(() => {
      Database.User.createUser.mockImplementation((user, callback) => callback({ status: 500, msg: "An error occurred" }));
      Database.User.getUser.mockImplementation((query, projection, callback) => callback({ status: 500, msg: "An error occurred" }));
      Database.User.updateUser.mockImplementation((query, data, callback) => callback({ status: 500, msg: "An error occurred" }))
    });
    
    it('should generate token on login call', (done) => {
      UserService.logIn({
        userEmail: "email@email.com",
        userPassword: "password"
      }, (err) => {
        expect(err).toEqual({ status: 500, msg: "An error occurred" })
        done();
      });
    });

    it('should sign up new user successfully', (done) => {
      UserService.signUp({
        userEmail: "email@email.com",
        userPassword: "password",
        userFirstName: "Example",
        userLastName: "User",
        userBirthday: Date.now().toString(),
        userAccountType: 'ADMIN'
      }, (err) => {
        expect(err).toEqual({ status: 500, msg: "An error occurred" });
        done();
      });
    }) 

    it('should succeed on password change', (done) => {
      UserService.changePassword({
        userId: "twelvechars!",
        userNewPassword: "newPassword"
      }, (err) => {
        expect(err).toEqual({ status: 500, msg: "An error occurred" })
        done();
      });
    });
  });
});
