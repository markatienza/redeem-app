const jwt = require('../utils/jsonwebtoken');
module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken).then(data => {
            next();
        }).catch(error => {
            res.status(403).json({ status: 403, message: "Invalid token! Please login!", isSuccess: false });
        })
    } else {
        // Forbidden
        res.status(403).json({ status: 403, message: "Invalid token! Please login!", isSuccess: false });
    }
}