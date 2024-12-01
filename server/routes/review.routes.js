const {
  getReviews,
  saveReview,
  getOneReview,
  editReview,
  deleteReview,
  filterReviews
} = require("../controllers/review.controllers")

const verifyToken = require("../middlewares/verifyToken")

const router = require("express").Router()

router.get('/reviews/search', filterReviews)

router.post('/reviews', verifyToken, saveReview)

router.put('/reviews/:id', editReview)

router.delete('/reviews/:id', deleteReview)

router.get('/reviews', getReviews)

router.get('/reviews/:id', getOneReview)

module.exports = router