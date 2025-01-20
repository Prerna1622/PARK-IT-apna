const express = require('express');
const router = express.Router();
const {createBooking,getAllBookings,getBookingById,updateBooking,deleteBooking} = require('../controllers/Booking');
const { auth } = require('../middlewares/auth');

// Route to create a new booking
router.post('/createbooking',auth, createBooking);

// Route to get all bookings
router.get('/getallbookings',getAllBookings);

// Route to get a booking by ID
router.get('/:id', getBookingById);

// Route to update a booking
router.put('/updatebooking/:id',updateBooking);

// Route to delete a booking
router.delete('/deletebooking/:id', deleteBooking);

module.exports = router;
