const express = require('express');
const router = express.Router();
const courseHandler = require('./handlers/teachers')

router.post('/', courseHandler.create);
router.get('/', courseHandler.getAll);
router.get('/:id', courseHandler.getTeacher);
router.put('/:id', courseHandler.update);
router.delete('/:id', courseHandler.destroy);

module.exports = router;
