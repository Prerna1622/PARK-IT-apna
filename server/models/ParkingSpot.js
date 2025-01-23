<<<<<<< HEAD
const mongoose = require("mongoose")

const spotSchema = new mongoose.Schema({
    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Location"
    },
    spotSize: {
        type:Number,
        required: true
=======
const mongoose = require("mongoose");

const parkingSpotSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true, // Ensure location is required
    },
    spotSize: {
        type: String,
        required: true,
>>>>>>> aa8c0c8c7070cd41ab09bdf30cf9b84a81997988
    },
    avalabilityStatus:{
        type:String,
        enum:["Available", "Occupied", "Inactive"],
        default: "Available"
    },
    pricePerHour: {
        type:Number
    },
    verification: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Verification"
    },
    bookings: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Booking"
        }
    ]
})

module.exports = mongoose.model("ParkingSpot", spotSchema);