var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var models = require('../models');
var hotelsSelected = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  Promise.all([
    models.Hotel.find({}).exec(),
    models.Restaurant.find({}).exec(),
    models.Activity.find({}).exec()
  ]).then(function(values) {
      var data = {
        hotels: values[0], restaurants: values[1], activities: values[2]
      };
      data.panelItems = function(label, items) {
        return {
          items: items,
          label: label
        }
      }
      return data;
  }).then(function(data) {
      res.render('index', data);
  }).catch(function(error) {
    if (error) throw Error(error.message);
    // next(error) -> Eric solution
  })
});

router.post('/', function(req, res, next) {
  var hotelSelection = req.body.hotelSelection;
  console.log(hotelSelection);
  hotelsSelected.push(hotelSelection);
  // $.ajax({
  //   url: "index.html",
  //   context: document.body
  // }).done(function() {
  //   $(this)
  // })
  res.send({hotelSelection: hotelSelection});
})

module.exports = router;
