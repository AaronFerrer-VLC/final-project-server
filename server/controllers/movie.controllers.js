const axios = require('axios')

const getMovieDetails = (req, res, next) => {

    const { id: movie_id } = req.params
    const url = `https://api.themoviedb.org/3/movie/${movie_id}`

    axios
        .get(url, { headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` } })
        .then(response => {
            res.json(response.data)
        })
        .catch(err => next(err))
}


module.exports = {
    getMovieDetails
}