const express = require('express');
const router = express.Router();
const courseHandler = require('./handlers/courses')
const chapterHandler = require('./handlers/chapters')
const lessonHandler = require('./handlers/lessons')
const imageHandler = require('./handlers/course-images')
const reviewHandler = require('./handlers/reviews')
const can = require('../middlewares/permission');

router.post('/', can('admin'), courseHandler.create);
router.get('/', courseHandler.getAll);
router.get('/:id', courseHandler.getCourse);
router.put('/:id', can('admin'), courseHandler.update);
router.delete('/:id', can('admin'), courseHandler.destroy);

router.post('/:courseId/chapters', can('admin'), chapterHandler.create);
router.get('/:courseId/chapters', chapterHandler.getAll);
router.get('/:courseId/chapters/:id', chapterHandler.getOne);
router.put('/:courseId/chapters/:id', can('admin'), chapterHandler.update);
router.delete('/:courseId/chapters/:id', can('admin'), chapterHandler.destroy);

router.post('/:courseId/lessons', can('admin'), lessonHandler.create);
router.get('/:courseId/lessons', lessonHandler.getAll);
router.get('/:courseId/lessons/:id', lessonHandler.getOne);
router.put('/:courseId/lessons/:id', can('admin'), lessonHandler.update);
router.delete('/:courseId/lessons/:id', can('admin'), lessonHandler.destroy);

router.post('/:courseId/images', can('admin'), imageHandler.create);
router.get('/:courseId/images', imageHandler.getAll);
router.get('/:courseId/images/:id', imageHandler.getOne);
router.delete('/:courseId/images/:id', can('admin'), imageHandler.destroy);

router.post('/:courseId/reviews', reviewHandler.create);
router.get('/:courseId/reviews', reviewHandler.getAll);
router.get('/:courseId/reviews/:id', reviewHandler.getOne);
router.put('/:courseId/reviews/:id', reviewHandler.update);
router.delete('/:courseId/reviews/:id', reviewHandler.destroy);

module.exports = router;
