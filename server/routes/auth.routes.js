const {
  signupUser,
  loginUser,
  verifyUser,
  filterUsers
} = require("../controllers/auth.controllers")

const verifyToken = require("./../middlewares/verifyToken")

const router = require("express").Router()


router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/verify', verifyToken, verifyUser)

router.get('/users/search', filterUsers)



module.exports = router