const { createClassRoom, updateClassRoom, deleteClassRoom, getClassRoom, getClassRooms } = require("../controllers/classroom.controller");

const router = require("express").Router();

router.post('/create',createClassRoom)
router.put('/update/:id',updateClassRoom)
router.delete('/remove/:id',deleteClassRoom)
router.get('/:id', getClassRoom)
router.get('/', getClassRooms)

module.exports = router;