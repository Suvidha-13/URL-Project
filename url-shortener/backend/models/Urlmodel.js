const mongoose = require('mongoose')

const shortUrlSchema = new mongoose.Schema({
    urlId: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})
module.exports = mongoose.model('ShortUrl', shortUrlSchema)