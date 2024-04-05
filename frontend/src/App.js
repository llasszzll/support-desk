import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewTicket from './pages/NewTicket';
import Tickets from './pages/NewTicket';
import Ticket from './pages/NewTicket';

// Wrap private route and insert new ticket

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-ticket' element={<PrivateRoute>
              <NewTicket /></PrivateRoute>} />
            <Route path='/tickets' element={<PrivateRoute>
              <Tickets /></PrivateRoute>} />
            <Route path='/ticket/:ticketId' element={<PrivateRoute>
              <Ticket /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}


export default App;
