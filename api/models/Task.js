var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    description : String,
    dateAdded : { type: Date, default: Date.now },
    dateCompleted: Date,
    isCompleted: {type: Boolean, default: false},
    ownerOAuthID: String

});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
