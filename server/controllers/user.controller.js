const response = require('../utils/handleResponse');
const { user } = require('../services')
module.exports = {
    createUser: async (req, res) => {
        try {
            const newUser = await user.create(req.body)
            response(res, 'congrats!', newUser);
        } catch (error) {
            response(res, error);
        }
    }
}
