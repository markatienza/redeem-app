const router = require('express').Router();
const userRoutes = require('./user.routes');
const prizesRoutes = require('./prizes.routes');

module.exports = () => {
    router.use('/user', userRoutes);
    router.use('/prizes', prizesRoutes);

    router.use((req, res) => {
        res.status(404).json('Page not found!');
    });

    return router;
}