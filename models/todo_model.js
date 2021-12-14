const mongoose = require('mongoose');

const todoschema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    endDate: {
     type: Date,
     default: Date.now()
    }
});
mongoose.exports =mongoose.model('myTodoModel',todoschema);