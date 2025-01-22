const express = require('express');
const router = express.Router();
const {createBooking,getAllBookings,updateBooking,deleteBooking,endBooking} = require('../controllers/Booking');
const { auth } = require('../middlewares/auth');

// Route to create a new booking
router.post('/createbooking',auth, createBooking);

// Route to get all bookings
router.get('/getallbookings',getAllBookings);



// Route to update a booking
router.put('/updatebooking',updateBooking);

// Route to delete a booking
router.delete('/deletebooking', deleteBooking);

router.post('/endbooking', auth, endBooking);

module.exports = router;
