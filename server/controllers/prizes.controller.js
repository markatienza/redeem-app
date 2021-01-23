const { response, badRequest } = require('../utils/handleResponse');
const service = require('../services');
const jwt = require('../utils/jsonwebtoken');
module.exports = {
    createPrizes: async (req, res) => {
        try {
            const data = req.body;
            if (!data.name) return badRequest(res, "Invalid Request!");
            const isExisting = await service.prizes.count({ name: data.name }) > 0;
            if (isExisting) return response(res, 'Prizes already exist!');
            const newPrizes = await service.prizes.create(req.body);
            return response(res, 'Success', newPrizes);
        } catch (error) {
            console.log(error)
            return response(res, error);
        }
    },
    getPrizes: async (req, res) => {
        try {
            const name = req.params.name;
            if (!name) return badRequest(res, 'Invalid request!')
            const prizes = await service.prizes.find({ name }, false)
            return response(res, 'Prize', prizes)
        } catch (error) {
            return response(res, error)
        }
    },
    getAllPrizes: async (req, res) => {
        try {
            const prizes = await service.prizes.find({ quantity: { $gt: 0 } }, true);
            return response(res, 'List of all available prizes', prizes)
        } catch (error) {
            return response(res, error);
        }
    },
    deductQuantity: async (req, res) => {
        try {
            const name = req.body.name;
            if (!name) return badRequest(res, 'Invalid Request!');
            const outOfQuantity = service.prizes.count({ name, quantity: { $lte: 0 } }) > 0;
            if (outOfQuantity) return response(res, 'Out of quantity!');
            const prize = await service.prizes.update({ name }, { $inc: { quantity: -1 } });
            return response(res, 'Success!', prize)
        } catch (error) {
            return response(res, error);
        }
    },
    updateQuantity: async (req, res) => {
        try {
            const name = req.body.name;
            const quantity = req.body.quantity || 10;
            if (!name) return badRequest(res, 'Invalid Request!');
            const prize = await service.prizes.update({ name }, { $set: { quantity } });
            return response(res, 'Success!', prize)
        } catch (error) {
            return response(res, error);
        }
    }

}
