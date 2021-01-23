const { Prizes } = require('../models');
const { BadRequest } = require('../utils/serverError')
module.exports = {
    create: async (prize) => {
        try {
            return await Prizes.create(prize);
        } catch (error) {
            throw new BadRequest('Error while creating new user!', error)
        }
    },
    update: async (query, toUpdate) => {
        try {
            return await Prizes.findOneAndUpdate(query, toUpdate, { new: true })
        } catch (error) {
            throw new BadRequest('Error while creating new user!', error)
        }
    },
    find: async (data = {}, isMany) => {
        try {
            if (isMany) {
                return await Prizes.find(data);
            } else {
                return await Prizes.findOne(data);
            }
        } catch (error) {
            throw new BadRequest('Error while finding user!', error)
        }
    },
    count: async (data) => {
        try {
            return await Prizes.countDocuments(data);
        } catch (error) {
            throw new BadRequest('Error while finding user!', error)
        }
    },
}

