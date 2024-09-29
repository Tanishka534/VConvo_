const {signup, firebaseSignin} = require("../controllers/usersController")
const {signin} = require("../controllers/usersController")
const {avatar} = require("../controllers/usersController")
const {allusers} = require("../controllers/usersController")
const {logout} = require("../controllers/usersController")
const router = require("express").Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post("firebaseSignin",firebaseSignin)
router.post("/avatar/:id",avatar)
router.get('/allusers/:id',allusers)
router.get('/logout/:id',logout)

module.exports = router;
