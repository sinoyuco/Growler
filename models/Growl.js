const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrowlSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    // add media
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Growl = mongoose.model('growl', GrowlSchema);