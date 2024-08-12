const { createTimeTable, updateTimeTable, deleteTimeTable, geTimeTable } = require("../controllers/timetable.controller");

const router = require("express").Router();

router.post('/create',createTimeTable)
router.put('/update/:id',updateTimeTable)
router.delete('/:id',deleteTimeTable)
router.get('/:classId', geTimeTable)

module.exports = router;