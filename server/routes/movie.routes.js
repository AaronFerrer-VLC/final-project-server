const {
    getMovieDetails,
} = require("../controllers/movie.controllers")

const router = require("express").Router()

router.get('/movies/:id', getMovieDetails)

module.exports = router