const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    startTime:{
        type:Date,
        default:Date.now,
    },
    endTime: {
        type: Date
    },
    totalAmount: {
        type:Number
    },
    paymentType: {
        type:String,
        enum:["Online", "Cash"],
        default:"Online"
    },
    payment: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment"
    },
    vehicle: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle"
    },
    spot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Spot"
    }

})

module.exports = mongoose.model("Booking", bookingSchema);