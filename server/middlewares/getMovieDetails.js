const axios = require('axios')
const Community = require('./../models/Community.model')


const getMovieDetails = (req, res, next) => {

    const { id: communityId } = req.params


    Community
        .findById(communityId)
        .then(community => {

            const moviesIds = community.moviesApiIds

            const moviePromises = moviesIds.map(eachMovieId => {

                const url = `https://api.themoviedb.org/3/movie/${eachMovieId}`

                return axios
                    .get(url, { headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` } })
                    .then(response => response.data)

            })

            return Promise.all(moviePromises)

        })
        .then(moviesDetails => {
            req.moviesDetails = moviesDetails
            next()
        })
        .catch(err => next(err))
}

module.exports = getMovieDetails