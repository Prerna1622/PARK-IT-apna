const mongoose = require('mongoose');
const ParkingSpot = require('../models/ParkingSpot'); // Adjust the path to match your project structure
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const Payment = require('../models/Payment');





/* 1 Create a new booking
exports.createBooking = async (req, res) => {
    try {
        //const newBooking = new Booking(req.body);
        const {spot,vehicle}=req.body;
        if(!spot || !vehicle)
        {
            return res.status(400).json({meassage:"Spot and Vehicle is not found.This are required"});
        }
        const newBooking = new Booking({
            spot,
            vehicle,
            startTime:Date.now(),
        });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/
//CreateParking
exports.createBooking = async (req, res) => {
    try {
        const { spot, vehicle } = req.body;
        if (!spot || !vehicle) {
            return res.status(400).json({ message: "Spot and Vehicle are required" });
        }
        const newBooking = new Booking({
            spot,
            vehicle,
            startTime: Date.now(),
        });

        const savedBooking = await newBooking.save();

        const updatedSpot = await ParkingSpot.findByIdAndUpdate(
            spot,
            {
                avalabilityStatus: "Occupied",
                $push: { bookings: savedBooking._id },
            },
            { new: true }
        );

        if (!updatedSpot) {
            return res.status(404).json({
                success:false,
                 message: "Parking spot not found"
                 });
        }
        const populatedBooking = await Booking.findById(savedBooking._id)
            .populate('vehicle') // Include vehicle details
            .populate('spot'); // Include spot details

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking: populatedBooking,
            spot: populatedBooking.spot,
            vehicle: populatedBooking.vehicle,
            });
    } catch (error) {
        res.status(500).json({ 
            success:false,
            message: "Booking not created successfully",
            error: error.message
         });
    }
};

exports.endBooking = async (req, res) => {
    try {
        const { id } = req.body;

        // Validate booking ID
        if (!id) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        // Fetch the booking and its associated spot
        const booking = await Booking.findById(id).populate('spot');
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Calculate duration and total amount
        const endTime = Date.now();
        const durationInHours = Math.ceil((endTime - booking.startTime) / (1000 * 60 * 60));
        const totalAmount = durationInHours * booking.spot.pricePerHour;

        // Update booking details
        booking.endTime = endTime;
        booking.totalAmount = totalAmount;

        const updatedBooking = await booking.save();

        // Update the parking spot's status to "Available"
        await ParkingSpot.findByIdAndUpdate(
            booking.spot._id,
            { avalabilityStatus: "Available" },
            { new: true }
        );

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('payment vehicle');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Update a booking
exports.updateBooking = async (req, res) => {
    try 
    {
        
            const { id, ...updateFields } = req.body; // Extract id and other fields from the body
    
            if (!id) {
                return res.status(400).json({ message: "Booking ID is required" });
            }    
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        ).populate('payment vehicle');
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBookingWithEndtime = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the booking by ID
        const booking = await Booking.findById(id).populate('spot');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Set the end time to the current time
        const endTime = Date.now();

        // Calculate the duration in hours
        const durationInHours = Math.ceil((endTime - booking.startTime) / (1000 * 60 * 60)); // Convert ms to hours

        // Get the price per hour from the spot
        const pricePerHour = booking.spot.pricePerHour;

        // Calculate the total amount
        const totalAmount = durationInHours * pricePerHour;

        // Update the booking with end time and total amount
        booking.endTime = endTime;
        booking.totalAmount = totalAmount;

        // Save the updated booking
        const updatedBooking = await booking.save();

        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

