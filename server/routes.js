const express = require("express");
const router = express.Router();
const dbo = require('./server/conn');
const { getChart } = require('billboard-top-100');
// const mongoose = require('mongoose')
 const Favorites = require('./db/models/Favorites');
// const FavModel = mongoose.model('Favorites',FavoritesSchema);
let curChart;
getChart((err,chart) => {
    if( err ) throw err;
    curChart = chart;
})

const { ObjectId } = require('mongodb');

router.route('/hot100').get(function(req,res){
    res.json(curChart);
});

router.route('/favorites').get(function(req,res){
    let db_connect = dbo.getDb("charts");
    db_connect.collection('favorites')
    .find({})
    .toArray(function(err,result){
      if( err ) throw err;
      //console.log('result:',result)
      res.json(result);
    })
});

router.route('/favorites/add').post(function(req, response){
    let db_connect = dbo.getDb();
    let favObj = {
      rank: req.body.rank,
      title: req.body.title,
      cover: req.body.cover,
      isFavorite : req.body.isFavorite
    };
    db_connect.collection("favorites").insertOne(favObj, function (err, res) {
      if (err) throw err;
      if( res && res.insertedId )
        res = { ...res, id : res.insertedId.toString() }
      response.json(res);
    });
});

router.route('/favorites/:id').delete((req,res) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("favorites").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.json(obj);
    });
})

module.exports = router;