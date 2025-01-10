const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const orderSchema = new mongoose.Schema({
    orderItemsIds : [{
        type: ObjectId,
        ref: "OrderItems",
        required: true
    }],
    total:{
        type: Number,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    street_address:{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code:{
        type:String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    order_status:{
        type: String,
        default: "pending"
    }
},{timestamps: true})

module.exports = mongoose.model("Order", orderSchema)