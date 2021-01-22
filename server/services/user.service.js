const { User } = require('../models');

module.exports = {
    create: async (userObj) => {
        try {
            return await User.create(userObj);
        } catch (error) {
            throw new Error('Error while creating new user!', error)
        }
    },
    find: async () => {
        try {
            return await User.find({});
        } catch (error) {
            throw new Error('Error while finding user!', error)
        }
    }
}

