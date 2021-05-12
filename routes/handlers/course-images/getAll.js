const apiAdapter = require('../../apiAdapter');
const {
  URL_SERVICE_COURSE,
  HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const images = await api.get(`/api/courses/${courseId}/images`);
    return res.json(images.data);
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        status: 'error',
        message: 'Service unavailable'
      });
    }

    const {status, data} = error.response;
    return res.status(status).json(data);
  }
}