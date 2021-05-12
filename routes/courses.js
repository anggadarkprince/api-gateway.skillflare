const express = require('express');
const router = express.Router();
const courseHandler = require('./handlers/courses')
const chapterHandler = require('./handlers/chapters')

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

module.exports = router;
