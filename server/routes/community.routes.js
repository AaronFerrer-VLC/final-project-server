const {
  getCommunities,
  saveCommunity,
  getOneCommunity,
  editCommunity,
  deleteCommunity,
  filterCommunities
} = require("../controllers/community.controllers")

const verifyToken = require("../middlewares/verifyToken")
// const getMovieDetails = require("../middlewares/getMovieDetails")

const router = require("express").Router()


router.get('/communities/search', filterCommunities)

router.post('/communities/', verifyToken, saveCommunity)

router.put('/communities/:id', verifyToken, editCommunity)

router.delete('/communities/:id', deleteCommunity)

router.get('/communities/', getCommunities)

router.get('/communities/:id', /*getMovieDetails,*/ getOneCommunity)

module.exports = router