const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRE,
    JWT_SECRET_TOKEN_EXPIRE
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
        const user = await api.post('/users/login', req.body);
        const data = user.data.data;

        const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRE });
        const refreshToken =  jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_SECRET_TOKEN_EXPIRE });

        await api.post('/refresh-tokens', {
            refresh_token: refreshToken,
            user_id: data.id
        });

        return res.json({
            status: 'success',
            data: {
                token,
                refresh_token: refreshToken
            }
        });
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({
                status: 'error',
                message: 'Service unavailable'
            });
        }

        const {status, data} = error.response;
        return res.status(status).json(data)
    }
}