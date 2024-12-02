const User = require('./../models/User.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10


const signupUser = (req, res, next) => {

    const { username, email, password, avatar, firstName, familyName, socialNetworksProfiles, bio, favoriteGenres, role, communities } = req.body

    if (email === '' || password === '' || username === '') {
        res.status(400).json({ message: "Provide email, password and name" })
        return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Provide a valid email address.' })
        return
    }

    if (password.length < 3) {
        res.status(400).json({ message: 'Password too short.' })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (user) {
                next(new Error('Usuario ya registrado'))
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ username, email, password: hashedPassword, avatar, firstName, familyName, socialNetworksProfiles, bio, favoriteGenres, role, communities })
        })
        .then(newUser => res.status(201).json(newUser))
        .catch(err => next(err))

}

const loginUser = (req, res, next) => {


    const { username, password, email } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'Provide username and password.' })
        return
    }

    User
        .findOne({ email })
        .then(user => {

            if (!user) {
                res.status(401).json({ message: "User not found." })
                return
            }

            const isCorrectPwd = bcrypt.compareSync(password, user.password)

            if (!isCorrectPwd) {
                res.status(401).json({ message: "Unable to authenticate the user" });
                return
            }


            const { _id, email, username } = user
            const payLoad = { _id, email, username }

            const authToken = jwt.sign(
                payLoad,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )

            res.json({ authToken })
        })
        .catch(err => next(err))

}

const verifyUser = (req, res, next) => {
    res.json({ loggedUserData: req.payload })
}

const filterUsers = (req, res, next) => {

    const { query } = req.query

    if (!query) {
        return res.status(400).json({ message: "Introduce un término de búsqueda" });
    }

    const querySearch = { username: { $regex: query, $options: 'i' } }

    User
        .find(querySearch)
        .then(reviews => res.json(reviews))
        .catch(err => next(err))
}

module.exports = {
    signupUser,
    loginUser,
    verifyUser,
    filterUsers
}