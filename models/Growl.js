const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrowlsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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

module.exports = Growl = mongoose.model('growls', GrowlsSchema);