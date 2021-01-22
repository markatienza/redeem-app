const response = require('../utils/handleResponse');
const { user } = require('../services')
module.exports = {
    createUser: async (req, res) => {
        try {
            const newUser = await user.create(req.body)
            response(res, 'Success', newUser);
        } catch (error) {
            response(res, error);
        }
    },
    getUser: async (req, res) => {
        try {
            
            response(res, 'Success', await user.find())
        } catch (error) {
            
        }
    }
}
