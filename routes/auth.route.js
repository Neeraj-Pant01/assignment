const { login, Register } = require("../controllers/auth.controller");
const { updateUSer, deleteUser, getUsers, AllTeachersAndStudents, getClassStudents } = require("../controllers/user.controller");

const router = require("express").Router();


router.post('/login',login)
router.post('/register',Register)
router.put('/update/:id',updateUSer)
router.delete('/remove/:id',deleteUser)
router.get('/',getUsers);
router.get('/students/:classNo',getClassStudents)

//principal action
router.get('/admin/action/:id',AllTeachersAndStudents);

module.exports = router;