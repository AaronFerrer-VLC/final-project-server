const mongoose = require('mongoose')
const Community = require('./../models/Community.model')

const getCommunities = (req, res, next) => {

    Community
        .find()
        .select({ title: 1, cover: 1, genres: 1 })
        .then(communities => res.json(communities))
        .catch(err => next(err))
}

const getOneCommunity = (req, res, next) => {

    const { id: communityId } = req.params

    if (!mongoose.Types.ObjectId.isValid(communityId)) {
        res.status(404).json({ message: "Id format not valid" });
        return
    }

    Community
        .findById(communityId)
        .then(community => {
            // const communityWithMoviesDetails = {
            //     ...community.toObject(),
            //     moviesDetails: req.moviesDetails
            // }
            // res.json(communityWithMoviesDetails)
            res.json(community)
        })
        .catch(err => next(err))

}

const saveCommunity = (req, res, next) => {

    const { title, description, cover, genres, fetishDirectors, fetishActors, decades, moviesApiIds, users } = req.body
    const { _id: owner } = req.payload

    Community
        .create({ title, description, cover, genres, fetishDirectors, fetishActors, decades, moviesApiIds, users, owner })
        .then(community => res.status(201).json(community))
        .catch(err => next(err))
}

const editCommunity = (req, res, next) => {

    const { title, description, cover, genres, fetishDirectors, fetishActors, decades, moviesApiIds, users } = req.body
    const { id: communityId } = req.params

    if (!mongoose.Types.ObjectId.isValid(communityId)) {
        res.status(404).json({ message: "Id format not valid" });
        return
    }

    Community
        .findByIdAndUpdate(
            communityId,
            { title, description, cover, genres, fetishDirectors, fetishActors, decades, moviesApiIds, users },
            { runValidators: true }
        )
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteCommunity = (req, res, next) => {

    const { id: communityId } = req.params

    if (!mongoose.Types.ObjectId.isValid(communityId)) {
        res.status(404).json({ message: "Id format not valid" });
        return
    }

    Community
        .findByIdAndDelete(communityId)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const filterCommunities = (req, res, next) => {

    const allowedFilters = ['title', 'description', 'fetishActors', 'fetishDirectors', 'genres', 'decades', 'moviesApiIds']
    const query = {}

    allowedFilters.forEach(filter => {
        if (req.query[filter]) {
            if (
                filter === 'title' ||
                filter === 'description' ||
                filter === 'fetishActors' ||
                filter === 'fetishDirectors'
            ) {
                query[filter] = { $regex: req.query[filter], $options: 'i' }
            }
            if (filter === 'moviesApiIds' ||
                filter === 'genres'
            ) {
                query[filter] = { $regex: `^${req.query[filter]}$`, $options: 'i' }
            }
            if (filter === 'decades') {
                query[filter] = req.query[filter]
            }

        } else {
            query[filter] = req.query[filter]
        }
    })

    Community
        .find(query)
        .then(communities => res.json(communities))
        .catch(err => next(err))
}


module.exports = {
    getCommunities,
    saveCommunity,
    getOneCommunity,
    editCommunity,
    deleteCommunity,
    filterCommunities
}