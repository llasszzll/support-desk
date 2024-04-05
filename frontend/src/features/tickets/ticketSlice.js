import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

// NOTE: use a extractErrorMessage function to save some repetition
import { extractErrorMessage } from '../../utils'

const initialState = {
    tickets: null,
    ticket: null,
}

// Create new Ticket
export const createTicket = createAsyncThunk('tickets/create', async (ticketData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// Get user Tickets with a S
export const getTickets = createAsyncThunk('tickets/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// Get user Ticket
export const getTicket = createAsyncThunk('tickets/get', async (ticketId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(ticketId, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// Close Ticket
export const closeTicket = createAsyncThunk(
    'tickets/close',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.closeTicket(ticketId, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error))
        }
    })

// NOTE: removed loading, isSuccess state as it can be infered from presence or
// absence of tickets for simpler state management with no need for a reset
// function


// passing in objects to retrieve ticket
export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                // NOTE: clear single ticket on tickets page, this replaces need for
                // loading state on individual ticket
                state.ticket = null
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.tickets = action.payload
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.ticket = action.payload
            })
            .addCase(closeTicket.pending, (state, action) => {
                state.ticket = action.payload
                state.tickets = state.tickets.map((ticket) =>
                    ticket._id === action.payload._id ? action.payload : ticket)
            })
    }
})

export default ticketSlice.reducer