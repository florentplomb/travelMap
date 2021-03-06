/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/posts              ->  index
 * POST    /api/posts              ->  create
 * GET     /api/posts/:id          ->  show
 * PUT     /api/posts/:id          ->  update
 * DELETE  /api/posts/:id          ->  destroy
 */

 'use strict';

 import _ from 'lodash';
 import Image from '../image/image.model';
 import Post from './post.model';
 import config from '../../config/environment';
 var imageCtrl = require('../image/image.controller.js')
 var gm = require('gm');

 var crypto = require('crypto'),
 http = require('http'),
 formidable = require('formidable'),
 fs = require('fs'),
 path = require('path');


 function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
    .then(updated => {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
      .then(() => {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  //statusCode = statusCode || 500;
  statusCode =  300;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Posts
export function index(req, res) {
  return Post.find()
  .populate({
      path: 'properties.image',
      select: '-img',
    })
  .exec()
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Gets a single Post from the DB
export function show(req, res) {
  return Post.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Creates a new Post in the DB
export function create(req, res) {
 var form = new formidable.IncomingForm();
 form.parse(req, function(err, fields, files) {


    var date = fields.dateTaken.toString().replace(/:/, "-"); // moche mais pas le temps pour une expr- regulière
    var dateTaken = date.replace(/:/, "-");
    var old_path = files.file.path;
     console.log(files);

    var newImage = new Image();

    newImage.img.data = fs.readFileSync(old_path);
    newImage.img.contentType = 'image/png';
    console.log(newImage.img.data);

    newImage.save(function(err, imageSaved) {

      if (err)  console.log(err);
      var newPost = new Post();
      newPost = {
        type: 'Feature',
        active: true,
        properties: {
          user: "57a2ac6cb4914f5818dc05c5",
          message: fields.message,
          image: [],
           // thumb : thumbSaved._id,
           title: fields.title,
           subTitle: fields.subTitle,
           dateTaken: dateTaken
         },
         geometry: {
          coordinates: [],
          type: "Point"
        }
      };
      newPost.geometry.coordinates.push(fields.lat);
      newPost.geometry.coordinates.push(fields.lng);
      newPost.properties.image.push(imageSaved._id);

      console.log(newPost);

      Post.create(newPost, function(err, postSaved) {
       if (err) return res.status(404).json(err)

        return res.status(200).json(postSaved)
    });



    });

  });

}


// Updates an existing Post in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Post.findById(req.params.id).exec()
  .then(handleEntityNotFound(res,500))
  .then(saveUpdates(req.body))
  .then(respondWithResult(res))
  .catch(handleError(res,500));
}

// Deletes a Post from the DB
export function destroy(req, res) {
  return Post.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}