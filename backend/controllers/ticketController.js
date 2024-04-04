const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc        Get user tickets
// @route       GET /api/tickets
// @access      Private
const getTickets = asyncHandler(async (req, res) => {
    // Get User using the if in the JWT
    const user = await User.findById(req.user.id)

    // If not the User found by the ID in the token
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Resolve to get user by the ID
    const tickets = await Ticket.find({ user: req.user.id })

    // Request response
    res.status(200).json(tickets)
})

/* ****************************************************************************** */
// How to query a single ticket
// @desc        Get user ticket
// @route       GET /api/tickets/:id
// @access      Private
const getTicket = asyncHandler(async (req, res) => {
    // Get User using the if in the JWT
    const user = await User.findById(req.user.id)

    // If not the User found by the ID in the token
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Resolve to get user by the ID
    // Get ID of user that is stored in the URL by the req.params.id
    const ticket = await Ticket.findById(req.params.id)
    // if there is no ticket with the id then....
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    // This is to limit who can view the ticket
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
    // Request response
    res.status(200).json(ticket)

})

/* ********************************************************************* */
// How to delete a ticket
// @desc        Delete a ticket
// @route       DELETE /api/tickets/:id
// @access      Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get User using the if in the JWT
    const user = await User.findById(req.user.id)

    // If not the User found by the ID in the token
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Resolve to get user by the ID
    // Get ID of user that is stored in the URL by the req.params.id
    const ticket = await Ticket.findById(req.params.id)
    // if there is no ticket with the id then....
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    // This is to limit who can view the ticket
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized!')
    }

    await Ticket.findByIdAndDelete(req.params.id)
    // Request response
    // Pass in success object
    res.status(200).json({ success: true })

})

// How to UPDATE ticket
// @desc        Update ticket
// @route       PUT /api/tickets/:id
// @access      Private
const updateTicket = asyncHandler(async (req, res) => {
    // Get User using the if in the JWT
    const user = await User.findById(req.user.id)

    // If not the User found by the ID in the token
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Resolve to get user by the ID
    // Get ID of user that is stored in the URL by the req.params.id
    const ticket = await Ticket.findById(req.params.id)
    // if there is no ticket with the id then....
    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    // This is to limit who can view the ticket
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
    // Update ticket using the Ticket model
    // Again using the URL + get the req.body from URL
    // Option object to set NEW to true
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // Response
    res.status(200).json(updatedTicket)
})

// THIS COULD HAVE BEEN A BLOG POST. POSTMAN API PULLS THROUGH THE DATA

// @desc        Create new ticket
// @route       POST /api/tickets
// @access      Private
const createTicket = asyncHandler(async (req, res) => {
    // destructure the request to get the body in the ticket
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a Product and Description')
    }

    const ticket = await Ticket.create({
        // takes in the following OBJECT
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}