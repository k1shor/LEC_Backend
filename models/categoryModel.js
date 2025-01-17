const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    category_name:{
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true})

module.exports = mongoose.model("Category", categorySchema)

// _id -> default, type: ObjectId , 24bit hex string
// timestamps -> createdAt, updatedAt