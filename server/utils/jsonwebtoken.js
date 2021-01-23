const jwt = require('jsonwebtoken');
const config = require('../config');
const { ServerError } = require('../utils/serverError')

module.exports = {
    sign: (data) => {
        return new Promise((resolve, reject) => {
            jwt.sign(data, config.jwt.secret, { expiresIn: config.jwt.exp }, function (err, token) {
                if (err) return reject(new ServerError('Error while signing token!', err));
                return resolve(token);
            });
        });
    },
    verify: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.jwt.secret, function (err, decoded) {
                if (err) return reject(new ServerError('Error while verifying token!', err));
                return resolve(decoded);
            });
        });
    }
}