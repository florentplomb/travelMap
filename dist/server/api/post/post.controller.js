/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/posts              ->  index
 * POST    /api/posts              ->  create
 * GET     /api/posts/:id          ->  show
 * PUT     /api/posts/:id          ->  update
 * DELETE  /api/posts/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.create = create;
exports.update = update;
exports.destroy = destroy;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _image = require('../image/image.model');

var _image2 = _interopRequireDefault(_image);

var _post = require('./post.model');

var _post2 = _interopRequireDefault(_post);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require('crypto'),
    http = require('http'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function (entity) {
    var updated = _lodash2.default.merge(entity, updates);
    return updated.save().then(function (updated) {
      return updated;
    });
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove().then(function () {
        res.status(204).end();
      });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Posts
function index(req, res) {
  return _post2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Post from the DB
function show(req, res) {
  return _post2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Post in the DB
function create(req, res) {

  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

    var date = fields.dateTaken.toString().replace(/:/, "-"); // moche mais pas le temps pour une expr- regulière
    var dateTaken = date.replace(/:/, "-");
    var old_path = files.file.path;
    var newImage = new _image2.default();
    newImage.img.data = fs.readFileSync(old_path);
    newImage.img.contentType = 'image/png';
    newImage.save(function (err, imageSaved) {
      if (err) console.log(err);

      console.log(imageSaved);

      var newPost = {
        type: 'Feature',
        active: true,
        properties: {
          user: "57a2ac6cb4914f5818dc05c5",
          message: fields.message,
          image: [],
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

      //console.log(newPost);

      return _post2.default.create(newPost).then(respondWithResult(res, 201)).catch(handleError(res));
    });
  });
}

// Updates an existing Post in the DB
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _post2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(saveUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Post from the DB
function destroy(req, res) {
  return _post2.default.findById(req.params.id).exec().then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=post.controller.js.map
