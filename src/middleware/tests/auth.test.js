const { generateToken } = require("../../utils/security");
const auth = require("../auth");

process.env.SECRET = "secret!"

describe('auth middleware', () => {
  let req, res, json;

  beforeEach(() => {
    req = {
      headers: {
        'x-access-token': generateToken('twelvechars!')
      }
    };
    json = jest.fn();
    status = jest.fn(() => ({ json }));
    res = { status };
  })

  it('should authenticate without erroring and return userId', (done) => {
    auth(req, res)
    expect(req.userId).toEqual('twelvechars!');
    done();
  });

  it('should error on verification failure', () => {
    req.headers['x-access-token'] = 'whatever'
    auth(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith('Failed to authenticate token.')
  });
})