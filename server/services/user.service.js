const { User } = require('../models');
const { BadRequest } = require('../utils/serverError')
module.exports = {
    create: async (userObj) => {
        try {
            return await User.create(userObj);
        } catch (error) {
            throw new BadRequest('Error while creating new user!', error)
        }
    },
    find: async (data = {}, isMany) => {
        try {
            if (isMany) {
                return await User.find(data);
            } else {
                return await User.findOne(data);
            }
        } catch (error) {
            throw new BadRequest('Error while finding user!', error)
        }
    },
    count: async (data) => {
        try {
            return await User.countDocuments(data);
        } catch (error) {
            throw new BadRequest('Error while finding user!', error)
        }
    },
    auth: async (data) => {
        try {
            const user = await User.findOne(data, false);
            if (!user) return null;
            return {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        } catch (error) {
            throw new BadRequest('Error while finding user!', error)
        }
    }
}

