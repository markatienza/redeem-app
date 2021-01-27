"use strict";

var _require = require('../utils/handleResponse'),
    response = _require.response,
    badRequest = _require.badRequest;

var service = require('../services');

var jwt = require('../utils/jsonwebtoken');

module.exports = {
  createUser: function createUser(req, res) {
    var data, isExisting, newUser;
    return regeneratorRuntime.async(function createUser$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            data = req.body;

            if (!(!data.username || !data.password || !data.firstName || !data.lastName)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", badRequest(res, 'Invalid request!'));

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(service.user.count({
              username: data.username
            }));

          case 6:
            _context.t0 = _context.sent;
            isExisting = _context.t0 > 0;

            if (!isExisting) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", response(res, 'User already exist!'));

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(service.user.create(req.body));

          case 12:
            newUser = _context.sent;
            return _context.abrupt("return", response(res, 'Success', newUser));

          case 16:
            _context.prev = 16;
            _context.t1 = _context["catch"](0);
            return _context.abrupt("return", response(res, _context.t1));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 16]]);
  },
  getUser: function getUser(req, res) {
    return regeneratorRuntime.async(function getUser$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.t0 = response;
            _context2.t1 = res;
            _context2.next = 5;
            return regeneratorRuntime.awrap(service.user.find({}, false));

          case 5:
            _context2.t2 = _context2.sent;
            (0, _context2.t0)(_context2.t1, 'Success', _context2.t2);
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t3 = _context2["catch"](0);
            return _context2.abrupt("return", response(res, _context2.t3));

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  },
  authUser: function authUser(req, res) {
    var data, auth, token;
    return regeneratorRuntime.async(function authUser$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            data = req.body;

            if (!(!data.username || !data.password)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", response(res, 'Invalid Username or Password!'));

          case 4:
            _context3.next = 6;
            return regeneratorRuntime.awrap(service.user.auth({
              username: data.username,
              password: data.password
            }));

          case 6:
            auth = _context3.sent;

            if (auth) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", response(res, 'Username does not exists!'));

          case 9:
            _context3.next = 11;
            return regeneratorRuntime.awrap(jwt.sign(auth));

          case 11:
            token = _context3.sent;
            return _context3.abrupt("return", response(res, 'Token', {
              user: auth,
              token: token
            }));

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", response(res, _context3.t0));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 15]]);
  },
  verifyToken: function verifyToken(req, res) {
    var bearerHeader, bearer, bearerToken, j, user;
    return regeneratorRuntime.async(function verifyToken$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            bearerHeader = req.headers['authorization'];

            if (!bearerHeader) {
              _context4.next = 15;
              break;
            }

            bearer = bearerHeader.split(' ');
            bearerToken = bearer[1];
            _context4.next = 7;
            return regeneratorRuntime.awrap(jwt.verify(bearerToken));

          case 7:
            j = _context4.sent;
            _context4.next = 10;
            return regeneratorRuntime.awrap(service.user.auth({
              username: j.username
            }));

          case 10:
            user = _context4.sent;
            console.log(user);
            response(res, 'Valid Token', {
              isValidToken: true,
              user: user
            });
            _context4.next = 16;
            break;

          case 15:
            response(res, 'Invalid Token', {
              isValidToken: false
            });

          case 16:
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", response(res, _context4.t0));

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 18]]);
  }
};