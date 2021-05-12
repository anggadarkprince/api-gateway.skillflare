const express = require('express');
const router = express.Router();
const teacherHandler = require('./handlers/teachers')

router.post('/', teacherHandler.create);
router.get('/', teacherHandler.getAll);
router.get('/:id', teacherHandler.getTeacher);
router.put('/:id', teacherHandler.update);
router.delete('/:id', teacherHandler.destroy);

module.exports = router;
