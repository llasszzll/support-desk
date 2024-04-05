import axios from 'axios'

const API_URL = '/api/tickets/'

// Create a new ticket
const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, ticketData, config)

    return response.data
}

// Get User tickets
const getTickets = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + ticketId, config)

    return response.data
}

// Close ticket
const closeTicket = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(
        API_URL + ticketId, { status: 'closed' }, config
    )

    return response.data
}


const ticketService = {
    createTicket,
    getTickets,
    closeTicket
}

export default ticketService
