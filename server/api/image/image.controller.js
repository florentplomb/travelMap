/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/images              ->  index
 * POST    /api/images              ->  create
 * GET     /api/images/:id          ->  show
 * PUT     /api/images/:id          ->  update
 * DELETE  /api/images/:id          ->  destroy
 */

 'use strict';

 import _ from 'lodash';
 import config from '../../config/environment';
 import Image from './image.model';

 var formidable = require('formidable'),
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
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Images
export function index(req, res) {
  // return Image.find().exec()
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
  return res.status(204).end();
}

// Gets a single Image from the DB
export function show(req, res) {
 Image.findById(req.params.id,function (err, doc) {
  if (err) return res.status(404).end();;
  res.contentType(doc.img.contentType);
  return res.send(doc.img.data);
});

  //   .then(handleEntityNotFound(res))
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Creates a new Image in the DB
export function create(req, res) {
  // return Image.create(req.body)
  //   .then(respondWithResult(res, 201))
  //   .catch(handleError(res));
}


// Creates a new Image in the DB
export function createThumb(req, res) {
 var form = new formidable.IncomingForm();
 form.parse(req, function(err, fields, files) {

   var old_path = files.file.path;
   var newThumb = new Image();
   newThumb.img.data = fs.readFileSync(old_path);
   newThumb.img.contentType = 'image/png';
   console.log(fields.imgThumbId);
   newThumb.save(function(err, thumbSaved) {
    var query = { _id: fields.imgThumbId };
    Image.findOneAndUpdate(query, {$set:{ thumb: thumbSaved._id }}, {new: true}, function (err, fullImg) {
      if (err) return res.status(404).send(err);
      return res.status(200).send(fullImg);
    })
  })
 }) 
} 

// Updates an existing Image in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  // return Image.findById(req.params.id).exec()
  //   .then(handleEntityNotFound(res))
  //   .then(saveUpdates(req.body))
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Deletes a Image from the DB
export function destroy(req, res) {
  // return Image.findById(req.params.id).exec()
  //   .then(handleEntityNotFound(res))
  //   .then(removeEntity(res))
  //   .catch(handleError(res));
}
