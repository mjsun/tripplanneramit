var express = require('express');
var router = express.Router();
var models = require('../models/index');
var Promise = require('bluebird');

router.get('/all', function(req, res){
   Promise.all([models.Hotel.find(), models.Restaurant.find(), models.Activity.find()])
   .then(function(all){
       res.json({hotels: all[0], restaurants: all[1], activities: all[2]});
   })
   .catch(function(err){
       console.log(err);
   })

});

router.get('/hotel/:id', function(req, res){

  var _id = req.params.id;
  models.Hotel.findOne({_id: _id}).then(function(data) {
        res.json(data);
  })
  .catch(function(err) {
          console.log(err);
          res.status(500);
  });

});

router.get('/restaurant/:id', function(req, res){

  var _id = req.params.id;
  models.Restaurant.findOne({_id: _id}).then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
          res.status(500);
  });

});

router.get('/activity/:id', function(req, res){

  var _id = req.params.id;
  models.Activity.findOne({_id: _id}).then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.log(err);
          res.status(500);
  });

});

module.exports = router;
