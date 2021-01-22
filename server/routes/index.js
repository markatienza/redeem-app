const router = require('express').Router();
const userRoutes = require('./user.routes');

module.exports = () => {
    router.use('/user', userRoutes);

    router.use((req, res) => {
        res.status(404).json('Page not found!');
    });

    return router;
}