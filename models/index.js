var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripPlannerAmit');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

// Eric code using chalk
// mongoose.connect('mongodb://localhost/tripPlanner', function(err) {
//   if (err) {
//     return console.log(chalk.red(err))
//   }
//   console.log(chalk.green("connect to database " + mongoose.connection.name))
// })


// var Activity = require('./activity');
// var Place = require('./place');
// var Hotel = require('./hotel');
// var Restaurant = require('./restaurant');

var Place, Hotel, Activity, Restaurant;
var Schema = mongoose.Schema;

var placeSchema = new Schema ({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Number]
});

var hotelSchema = new Schema ({
  name: String,
  place: [placeSchema], // [placeSchema]
  num_stars: {type: Number, min: 1, max: 5},
  amenities: [String] // is this a comma delimited list?
});

var activitySchema = new Schema ({
  name: String,
  place: [placeSchema], //[placeSchema]
  age_range: String
});

var restaurantSchema = new Schema ({
  name: String,
  place: [placeSchema], // [placeSchema]
  cuisines: [String],
  price: {type: Number, min: 1, max: 5}
});

Place = mongoose.model('Place', placeSchema);
Hotel = mongoose.model('Hotel', hotelSchema);
Activity = mongoose.model('Activity', activitySchema);
Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
  Place: Place,
  Restaurant: Restaurant,
  Activity: Activity,
  Hotel: Hotel
};
