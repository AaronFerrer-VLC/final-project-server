const mongoose = require('mongoose')

const Review = require('../models/Review.model')

const getReviews = (req, res, next) => {

    Review
        .find()
        .then(reviews => res.json(reviews))
        .catch(err => next(err))
}

const getOneReview = (req, res, next) => {

    const { id: reviewId } = req.params

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(404).json({ message: "Id format not valid" });
        return
    }

    Review
        .findById(reviewId)
        .then(review => res.json(review))
        .catch(err => next(err))
}

const saveReview = (req, res, next) => {

    const { movieApiId, content, rate } = req.body
    const { _id: author } = req.payload

    Review
        .create({ author, movieApiId, content, rate })
        .then(review => res.status(201).json(review))
        .catch(err => next(err))
}

const editReview = (req, res, next) => {

    const { author, movieApiId, content, rate, likesCounter } = req.body
    const { id: reviewId } = req.params

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(404).json({ message: "Id format not valid" });
        return
    }

    Review
        .findByIdAndUpdate(
            reviewId,
            { author, movieApiId, content, rate, likesCounter },
            { runValidators: true }
        )
        .then(review => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteReview = (req, res, next) => {

    const { id: reviewId } = req.params

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        res.status(404).json({ message: "Id format not valid" });
        return
    }

    Review
        .findByIdAndDelete(reviewId)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const filterReviews = (req, res, next) => {

    Review
        .find(req.query)
        .then(reviews => res.json(reviews))
        .catch(err => next(err))
}


module.exports = {
    getReviews,
    saveReview,
    getOneReview,
    editReview,
    deleteReview,
    filterReviews
}