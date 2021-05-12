const express = require('express');
const router = express.Router();
const courseHandler = require('./handlers/courses')

router.post('/', courseHandler.create);
router.get('/', courseHandler.getAll);
router.get('/:id', courseHandler.getCourse);
router.put('/:id', courseHandler.update);
router.delete('/:id', courseHandler.destroy);

module.exports = router;
