const { Users } = require('../models');
const { BadRequest } = require('../utils/serverError')
module.exports = {
    create: async (userObj) => {
        try {
            return await Users.create(userObj);
        } catch (error) {
            throw new BadRequest('Error while creating new user!', error)
        }
    },
    find: async (data = {}, isMany) => {
        try {
            if (isMany) {
                return await Users.find(data);
            } else {
                return await Users.findOne(data);
            }
        } catch (error) {
            throw new BadRequest('Error while finding user!', error)
        }
    },
    count: async (data) => {
        try {
            return await Users.countDocuments(data);
        } catch (error) {
            throw new BadRequest('Error while finding user!', error)
        }
    },
    auth: async (data) => {
        try {
            const user = await Users.findOne(data, false);
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

