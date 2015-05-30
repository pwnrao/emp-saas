var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projSchema = new Schema({
    title: String,
    description: String,
    email: String,
    founder: String,
    stage: String
});
module.exports = mongoose.model('projectid', projSchema);   

 
 