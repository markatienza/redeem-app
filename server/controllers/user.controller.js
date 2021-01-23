const { response, badRequest } = require('../utils/handleResponse');
const service = require('../services');
const jwt = require('../utils/jsonwebtoken')
module.exports = {
    createUser: async (req, res) => {
        try {
            const data = req.body;
            if (!data.username || !data.password || !data.firstName || !data.lastName) return badRequest(res, 'Invalid request!')

            const isExisting = await service.user.count({ username: data.username }) > 0;
            if (isExisting) return response(res, 'User already exist!');
            const newUser = await service.user.create(req.body);
            return response(res, 'Success', newUser);
        } catch (error) {
            return response(res, error);
        }
    },
    getUser: async (req, res) => {
        try {
            response(res, 'Success', await service.user.find({}, false))
        } catch (error) {
            return response(res, error);
        }
    },
    authUser: async (req, res) => {
        try {
            const data = req.body;
            if (!data.username || !data.password) return response(res, 'Invalid Username or Password!');
            const auth = await service.user.auth({ username: data.username, password: data.password });
            if (!auth) return response(res, 'Username does not exists!');
            const token = await jwt.sign(auth);
            return response(res, 'Token', { user: auth, token })
        } catch (error) {
            return response(res, error);
        }
    },
    verifyToken: async (req, res) => {
        try {
            const token = req.body.token;
            if (!token) return badRequest(res, 'Invalid Token!');
            const isValid = await jwt.verify(token);
            return response(res, 'TOKEN!', isValid);
        } catch (error) {
            return response(res, error)
        }
    }
}
