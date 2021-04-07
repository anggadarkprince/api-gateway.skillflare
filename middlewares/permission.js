module.exports = (...roles) => {
    return (req, res, next) => {
        const role = req.user.data.role;
        if (!roles.includes(role)) {
            return res.status(401).json({
                status: 'unauthorized',
                code: 401,
                message: 'You are unauthorized'
            });
        }

        return next();
    }
}