const apiAdapter = require('../../apiAdapter');
const {
  URL_SERVICE_COURSE,
  HOSTNAME
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const reviews = await api.get(`/api/courses/${courseId}/reviews`);
    const reviewsData = reviews.data;
    const firstPage = reviewsData.data.first_page_url.split('?').pop();
    const lastPage = reviewsData.data.last_page_url.split('?').pop();

    reviewsData.data.first_page_url = `${HOSTNAME}/courses/${courseId}/reviews?${firstPage}`;
    reviewsData.data.last_page_url = `${HOSTNAME}/courses/${courseId}/reviews?${lastPage}`;

    if (reviewsData.data.next_page_url) {
      const nextPage = reviewsData.data.next_page_url.split('?').pop();
      reviewsData.data.next_page_url = `${HOSTNAME}/courses/${courseId}/reviews?${nextPage}`;
    }

    if (reviewsData.data.prev_page_url) {
      const prevPage = reviewsData.data.prev_page_url.split('?').pop();
      reviewsData.data.prev_page_url = `${HOSTNAME}/courses/${courseId}/reviews?${prevPage}`;
    }

    reviewsData.data.path = `${HOSTNAME}/courses/${courseId}/reviews`;

    return res.json(reviewsData);
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