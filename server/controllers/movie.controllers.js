const axios = require('axios')

const getMovieDetails = (req, res, next) => {

    const { id: movie_id } = req.params
    const url = `https://api.themoviedb.org/3/movie/${movie_id}`

    axios.get(url, { headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` } })
        .then(response => {
            res.json(response.data)
        })
        .catch(err => next(err))
}

const getMoviesDetailsFromCommunity = ({ moviesApiIds }, req, res, next) => {

    const url = `https://api.themoviedb.org/3/movie/${moviesApiIds[0]}`

    axios.get(url)
        .then(response => {
            const datos = response.data;
            // Procesa los datos aquí

            const datosProcesados = datos.map(item => ({
                title: item.original_title,
                poster: item.poster_path,
                estreno: item.descripcion
            }))
        })
        .catch(error => next(error))
}

module.exports = {
    getMovieDetails,
    getMoviesDetailsFromCommunity
}