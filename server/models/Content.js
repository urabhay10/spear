const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: ""
    },
    type: {
        type: String,
        required: true,
        default: "Novel",
        enum: ["Novel", "Story", "Note"]
    },
    description: {
        type: String,
        required: false,
        default: ""
    },
    chapters: {
        type: [{
            title: {
                type: String,
                required: true,
                default: ""
            },
            content: {
                type: String,
                required: false
            }
        }],
        required: false,
        default: []
    },
    uniqueId: {
        type: String,
        required: true,
        default: "",
        unique: true
    },
    content: {
        type: String,
        required: false,
        default: ""
    },
    genre: {
        type: String,
        required: false
    }
});
contentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Content', contentSchema);