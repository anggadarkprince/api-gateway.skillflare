const axios = require('axios')

module.exports = (baseUrl) => {
    return axios.create({
        baseURL: baseUrl,
        timeout: process.env.API_TIMEOUT
    })
}