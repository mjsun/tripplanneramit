var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripPlanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Activity;
var Schema = mongoose.Schema;

var activitySchema = new Schema ({
  name: String,
  place: String,
  age_range: String
});

Activity = mongoose.model('Activity', activitySchema);

module.exports = {
  Activity: Activity
};
