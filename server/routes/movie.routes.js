const {
    getMovieDetails,
    findMovie,
} = require("../controllers/movie.controllers")

const router = require("express").Router()

router.get('/movies/:id', getMovieDetails)

router.get('/movies/search/:querySearch', findMovie)

module.exports = router