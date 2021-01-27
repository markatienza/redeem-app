"use strict";

var _require = require('../models'),
    Users = _require.Users;

var _require2 = require('../utils/serverError'),
    BadRequest = _require2.BadRequest;

module.exports = {
  create: function create(userObj) {
    return regeneratorRuntime.async(function create$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Users.create(userObj));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            throw new BadRequest('Error while creating new user!', _context.t0);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 6]]);
  },
  find: function find() {
    var data,
        isMany,
        _args2 = arguments;
    return regeneratorRuntime.async(function find$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
            isMany = _args2.length > 1 ? _args2[1] : undefined;
            _context2.prev = 2;

            if (!isMany) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return regeneratorRuntime.awrap(Users.find(data));

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 9:
            _context2.next = 11;
            return regeneratorRuntime.awrap(Users.findOne(data));

          case 11:
            return _context2.abrupt("return", _context2.sent);

          case 12:
            _context2.next = 17;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](2);
            throw new BadRequest('Error while finding user!', _context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 14]]);
  },
  count: function count(data) {
    return regeneratorRuntime.async(function count$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(Users.countDocuments(data));

          case 3:
            return _context3.abrupt("return", _context3.sent);

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            throw new BadRequest('Error while finding user!', _context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 6]]);
  },
  auth: function auth(data) {
    var user;
    return regeneratorRuntime.async(function auth$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(Users.findOne(data, false));

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", null);

          case 6:
            return _context4.abrupt("return", {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              _id: user._id
            });

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            throw new BadRequest('Error while finding user!', _context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 9]]);
  }
};