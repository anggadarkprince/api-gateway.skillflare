const apiAdapter = require('../../apiAdapter');
const {URL_SERVICE_COURSE} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const chapter = await api.post(`/api/courses/${courseId}/chapters`, req.body);
    return res.json(chapter.data);
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