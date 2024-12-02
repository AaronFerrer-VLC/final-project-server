const axios = require('axios')
const Community = require('./../models/Community.model')


const getMovieDetails = (req, res, next) => {

    const { id: communityId } = req.params


    Community
        .findById(communityId)
        .then(community => {

            const moviesIds = community.moviesApiIds

            let moviesDetails = []

            moviesIds.forEach(eachMovieId => {

                const url = `https://api.themoviedb.org/3/movie/${eachMovieId}`

                axios
                    .get(url, { headers: { Authorization: `Bearer ${process.env.TMDB_API_TOKEN}` } })
                    .then(response => {
                        moviesDetails.push(response.data)
                        return moviesDetails
                    })
                    .catch(err => next(err))
            })

        })
        .then(response => res.json(response))
        .catch(err => next(err))


}

module.exports = getMovieDetails