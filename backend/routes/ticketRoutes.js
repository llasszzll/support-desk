const express = require('express')
const router = express.Router()

const {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
} = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')


const noteRouter = require('./noteRoutes')
router.use('./:ticketsId/notes', noteRouter)

// API routes
// Routes + CRUD is protected to user Only updates
router.route('/').get(protect, getTickets).post(protect, createTicket)


router
    .route('/:id')
    .get(protect, getTicket)
    .delete(protect, deleteTicket)
    .put(protect, updateTicket)

module.exports = router