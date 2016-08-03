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
 import Post from './post.model';
 var crypto = require('crypto'),
 http = require('http'),
 formidable = require('formidable'),
 fs = require('fs'),
 path = require('path'),
 uuid = require('node-uuid');
 


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

// Gets a list of Posts
export function index(req, res) {
  return Post.find().exec()
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
        // `file` is the name of the <input> field of type `file`
        console.log(fields);

        var old_path = files.file.path,
        file_size = files.file.size,
        file_ext = files.file.name.split('.').pop(),
        file_name = uuid.v1(),
        new_path = 'server/upload/' + file_name + '.' + file_ext; // Generate a v1 (time-based) id , v4 (random)
           // new_path = path.join(process.env.PWD, '/upload', file_name + '.' + file_ext);
           console.log(new_path.toString());
           fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path.toString(), data, function(err) {
              fs.unlink(old_path, function(err) {
                if (err) {
                  res.status(500);
                  res.json({'success': false});
                } else {
                 var newPost = {
                  type : 'Feature',
                  active : true,
                  properrties :{
                    user : "Florent",
                    imageId : file_name + '.' + file_ext,
                    message : fields.imgMessage,
                  },
                  geometry: {
                    coordinates : [],
                    type : "Point"
                  }
                };

                  newPost.geometry.coordinates.push(fields.lat);
                  newPost.geometry.coordinates.push(fields.lng);
                console.log(newPost);
                res.status(200);
                res.json({'success': true});
              }
            });
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
  .then(handleEntityNotFound(res))
  .then(saveUpdates(req.body))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

// Deletes a Post from the DB
export function destroy(req, res) {
  return Post.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}
