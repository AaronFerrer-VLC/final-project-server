module.exports = app => {

    const authRouter = require("./auth.routes")
    app.use("/api", authRouter)

    const communityRouter = require("./community.routes")
    app.use("/api", communityRouter)

    const reviewRouter = require("./review.routes")
    app.use("/api", reviewRouter)

    const movieRouter = require("./movie.routes")
    app.use("/api", movieRouter)
}