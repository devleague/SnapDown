'use strict';

var express = require('express');
var router = express.Router();
var db = require('../models').Image;

//Don't need to get all the pictures yet
// router.get('/', function(req,res) {

//   db.findAll()

//     .then(function(results) {

//       res.json(results);
//     });
// });



router.get('/:id', function(req,res) {

  db.findOne({

    where: {

      id: req.params.id
    }

  }).then(function(result) {

    if(result) {

      res.json(result);

    } else {

      res.status(404);
      res.send("Could not locate the requested resource.");
    }
  });
});

router.post('/', function(req,res) {

  db.create({

    // user_id: req.body.user_id,
    // image_id: req.body.image_id,
    // challenger_id: req.body.challenge_id,
    s3_reference: req.body.s3_reference,
    privacy_status: req.body.privacy_status,
    challenger_id: req.body.challenger_id

  }).then(function(result) { //may be unnecessary

    res.status(200).json(result);
  });
});

router.put('/:id', function(req,res) {

  db.findOne({

    where: {

      id: req.params.id
    }

  }).then(function(result){

    if(!result) {

      res.status(404);
      res.send("Could not locate the requested resource.");
    }

    var updateData = {};

    // if(req.body.user_id !== undefined) {

    //   updateData.user_id = req.body.user_id;
    // }

    // if(req.body.image_id !== undefined) {

    //   updateData.image_id = req.body.image_id;
    // }

    // if(req.body.challenger_id !== undefined) {

    //   updateData.challenger_id = req.body.challenger_id;
    // }

    if(req.body.s3_reference !== undefined) {

      updateData.s3_reference = req.body.s3_reference;
    }

    if(req.body.privacy_status !== undefined) {

      updateData.privacy_status = req.body.privacy_status;
    }

    if(req.body.challenger_id !== undefined) {

      updateData.challenger_id = req.body.challenger_id;
    }

    result.updateAttributes(updateData).then(function(result) {

      res.status(200);
      res.json(result);
    });
  });
});

router.delete('/:id', function(req,res) {

  var id = req.params.id;

  db.findOne({

    where: {

      id: id
    }

  }).then(function(result) {

    if(!result) {

      res.status(404);
      res.send("Could not locate the requested resource.");

    } else {

      result.destroy().then(function() {

        res.status(200).send();
      });
    }
  });
});

module.exports = router;