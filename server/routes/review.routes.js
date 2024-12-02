const {
  getReviews,
  getReviewsFromMovie,
  saveReview,
  getOneReview,
  editReview,
  deleteReview,
  filterReviews,
  getReviewsFromAuthor,
  getTopRatedReviews
} = require("../controllers/review.controllers")


const verifyToken = require("../middlewares/verifyToken")

const router = require("express").Router()


router.get('/reviews/search', filterReviews)
router.post('/reviews', verifyToken, saveReview)
router.put('/reviews/:id', editReview)
router.get('/reviews/movies/:movieId', getReviewsFromMovie)
router.get('/reviews/users/:authorId', getReviewsFromAuthor)
router.get('/reviews/top-rated', getTopRatedReviews)
router.delete('/reviews/:id', deleteReview)
router.get('/reviews', getReviews)
router.get('/reviews/:id', getOneReview)

module.exports = router