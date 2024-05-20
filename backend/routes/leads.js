const express = require('express')

// leadController.js functions
const {
    createLead,
    getLeads,
    getSingleLead,
    deleteLead,
    updateLead,
    getTLLeads,
    getUnassignedLeads
} = require('../controllers/leadController')

// inventoryController.js function
const { getInventory } = require('../controllers/inventoryController')

// recentBookingController.js function
const { getRecentBookings } = require('../controllers/recentBookingController')

const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

// require auth for all lead routes
router.use(requireAuth)

/** --- ADMIN --- */
router.get('/tl', getTLLeads) // GET all TL leads
router.get('/inventory', getInventory) // GET inventory
router.get('/recent-bookings', getRecentBookings)

/** --- TELEMARKETER --- */
router.get('/unassigned', getUnassignedLeads) // LEAD DISTRIBUTION

/** --- LEAD GENERATION  --- */
router.get('/', getLeads) // GET all leads for Lead Generation

/** --- ALL  --- */
router.get('/:id', getSingleLead) // GET a single lead
router.post('/', createLead) // POST a new lead
router.delete('/:id', deleteLead) // DELETE a lead
router.patch('/:id', updateLead) // UPDATE a lead

module.exports = router
