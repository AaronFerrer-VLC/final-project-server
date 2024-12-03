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

const filterCommunities = async (req, res, next) => {

    const allowedFilters = ['title', 'description', 'fetishActors', 'fetishDirectors', 'genres', 'decades', 'moviesApiIds']

    try {
        // Construir el filtro dinámico
        const filters = {};

        if (req.query.title) {
            filters.title = { $regex: req.query.title, $options: 'i' }; // Búsqueda por coincidencia parcial (case-insensitive)
        }
        if (req.query.description) {
            filters.description = { $regex: req.query.description, $options: 'i' };
        }
        if (req.query.genres) {
            filters.genres = { $in: req.query.genres.split(',') }; // Verifica si hay algún género en la lista
        }
        if (req.query.fetishDirectors) {
            filters.fetishDirectors = { $in: req.query.fetishDirectors.split(',') };
        }
        if (req.query.fetishActors) {
            filters.fetishActors = { $in: req.query.fetishActors.split(',') };
        }
        if (req.query.decades) {
            filters.decades = { $in: req.query.decades.split(',').map(Number) }; // Convierte a números
        }
        if (req.query.owner) {
            filters.owner = req.query.owner; // Buscar por ID exacto
        }

        // Ejecutar la consulta
        const communities = await Community.find(filters);

        // Responder con los resultados
        res.status(200).json(communities);
    } catch (error) {
        res.status(500).json({ error: 'Error al realizar la búsqueda', details: error.message });
    }



    // Community
    //     .find(query)
    //     .then(communities => res.json(communities))
    //     .catch(err => next(err))
}


module.exports = {
    getCommunities,
    saveCommunity,
    getOneCommunity,
    editCommunity,
    deleteCommunity,
    filterCommunities
}