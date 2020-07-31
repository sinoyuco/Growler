const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrowlsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        // type: Objecy,
        // required: true
    },
    text: {
        type: String,
        required: true
    },
    handle:{
        type: String,
        required: false
    },
    // add media
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Growl = mongoose.model('growls', GrowlsSchema);