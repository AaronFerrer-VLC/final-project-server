const {
  getCommunities,
  saveCommunity,
  getOneCommunity,
  editCommunity,
  deleteCommunity,
  filterCommunities
} = require("../controllers/community.controllers")

const verifyToken = require("../middlewares/verifyToken")

const router = require("express").Router()


router.get('/communities/search', filterCommunities)

router.post('/communities/', verifyToken, saveCommunity)

router.put('/communities/:id', editCommunity)

router.delete('/communities/:id', deleteCommunity)

router.get('/communities/', getCommunities)

router.get('/communities/:id', getOneCommunity)

module.exports = router