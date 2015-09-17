var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripPlanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Hotel;
var Schema = mongoose.Schema;

var hotelSchema = new Schema ({
  name: String,
  place: String,
  num_stars: {type: Number, min: 1, max: 5},
  amenities: [String] // is this a comma delimited list?
});

Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = {
  Hotel: Hotel
};
