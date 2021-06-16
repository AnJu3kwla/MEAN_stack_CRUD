const mongoose = require('mongoose');

var employee = mongoose.model('Employee', {
    name : {type: String},
    position : {type: String},
    office : {type: String},
    salary : {type: Number}
});

//if both vobject ame and collection name is equal , {Employee}
module.exports = { Employee : employee };
