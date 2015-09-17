var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripPlanner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Restaurant;
var Schema = mongoose.Schema;

var restaurantSchema = new Schema ({
  name: String,
  place: String,
  cuisines: [String],
  price: {type: Number, min: 1, max: 5}
});

Restaurant = mongoose.model('Restaurant', restaurantSchema);


module.exports = {
  Restaurant: Restaurant

};
