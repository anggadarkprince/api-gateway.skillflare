const jwt = require('jsonwebtoken');
const TokenExpiredError = require("jsonwebtoken/lib/TokenExpiredError");
const {JWT_SECRET} = process.env;

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies.token || (authHeader && authHeader.split(' ')[1]);

    jwt.verify(token, JWT_SECRET, function (err, decoded) {
        if (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({
                    status: "expired",
                    code: 401,
                    message: err.message
                });
            }
            return res.status(403).json({
                status: 'forbidden',
                code: 403,
                message: err.message
            });
        }

        req.user = decoded;

        return next();
    });
}