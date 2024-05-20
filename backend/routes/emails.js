const express = require('express')
const {
    getEmails,
    getSingleEmail,
    createEmail,
    deleteEmail,
    updateEmail
} = require('../controllers/emailController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all lead routes
router.use(requireAuth)

// GET all emails
router.get('/', getEmails)

// GET a single lead
router.get('/:id', getSingleEmail)

// POST a new lead
router.post('/', createEmail)

// DELETE a lead
router.delete('/:id', deleteEmail)

// UPDATE a lead
router.patch('/:id', updateEmail)

module.exports = router