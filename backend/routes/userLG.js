const express = require('express')

// controller functions
const { signupUserLG, loginUserLG, logoutUserLG, updateUserLG, getUserLG, getSingleUserLG, deleteUserLG } = require('../controllers/userLGController')

const router = express.Router()

// Import the requireAuth middleware
const requireAuth = require('../middleware/requireAuth')

// login route
router.post('/login', loginUserLG)

// signup route
router.post('/signup', signupUserLG)

// logout route
router.post('/logout', requireAuth, logoutUserLG)

// update user route
router.patch('/:id', updateUserLG)

// get all users
router.get('/', getUserLG)

// get a single user
router.get('/:id', getSingleUserLG)

// delete a user
router.delete('/:id', deleteUserLG)

module.exports = router