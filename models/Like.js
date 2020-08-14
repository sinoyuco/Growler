const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        // type: Objecy,
        // required: true
    },
    growl_id: {
        type: String,
        required: true
    }
});

module.exports = Like = mongoose.model('likes', LikesSchema);