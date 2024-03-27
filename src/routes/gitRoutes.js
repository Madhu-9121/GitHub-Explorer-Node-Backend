const express = require('express')
const router = express.Router()
const gitController = require('../controllers/gitController')
router.get('/save-user/:username',gitController.getOrSaveUser)
router.get('/find-mutual-followers/:username',gitController.findMutualFollowers)
router.get('/search-users',gitController.searchByParameters)
router.delete('/delete-user/:username',gitController.softDeleted)
router.patch('/update-user/:username',gitController.updateUser)
router.get('/list-users',gitController.getListOfUsers)




module.exports = router