const express = require('express');
const router = express.Router();
const courseHandler = require('./handlers/courses')
const chapterHandler = require('./handlers/chapters')
const lessonHandler = require('./handlers/lessons')
const imageHandler = require('./handlers/course-images')

router.post('/', courseHandler.create);
router.get('/', courseHandler.getAll);
router.get('/:id', courseHandler.getCourse);
router.put('/:id', courseHandler.update);
router.delete('/:id', courseHandler.destroy);

router.post('/:courseId/chapters', chapterHandler.create);
router.get('/:courseId/chapters', chapterHandler.getAll);
router.get('/:courseId/chapters/:id', chapterHandler.getOne);
router.put('/:courseId/chapters/:id', chapterHandler.update);
router.delete('/:courseId/chapters/:id', chapterHandler.destroy);

router.post('/:courseId/lessons', lessonHandler.create);
router.get('/:courseId/lessons', lessonHandler.getAll);
router.get('/:courseId/lessons/:id', lessonHandler.getOne);
router.put('/:courseId/lessons/:id', lessonHandler.update);
router.delete('/:courseId/lessons/:id', lessonHandler.destroy);

router.post('/:courseId/images', imageHandler.create);
router.get('/:courseId/images', imageHandler.getAll);
router.get('/:courseId/images/:id', imageHandler.getOne);
router.delete('/:courseId/images/:id', imageHandler.destroy);

module.exports = router;
