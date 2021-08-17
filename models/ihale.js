const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tenderSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },
    status: {
        type: Number,
        require: true
    },
    minPrice: {
        type: Number,
        require: true
    }
}, { timestamps: true})

const Tender = mongoose.model("Tender", tenderSchema)
module.exports = Tender