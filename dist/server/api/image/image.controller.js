/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/images              ->  index
 * POST    /api/images              ->  create
 * GET     /api/images/:id          ->  show
 * PUT     /api/images/:id          ->  update
 * DELETE  /api/images/:id          ->  destroy
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

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _image = require('./image.model');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// Gets a list of Images
function index(req, res) {
  // return Image.find().exec()
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
  return res.status(204).end();
}

// Gets a single Image from the DB
function show(req, res) {

  _image2.default.findById(req.params.id, function (err, doc) {
    if (err) return res.status(404).end();
    res.contentType(doc.img.contentType);
    res.send(doc.img.data);
    return res;
  });

  // return Image.findById(req.params.id).exec()
  //   .then(handleEntityNotFound(res))
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));

}

// Creates a new Image in the DB
function create(req, res) {}
// return Image.create(req.body)
//   .then(respondWithResult(res, 201))
//   .catch(handleError(res));


// Updates an existing Image in the DB
function update(req, res) {
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
function destroy(req, res) {
  // return Image.findById(req.params.id).exec()
  //   .then(handleEntityNotFound(res))
  //   .then(removeEntity(res))
  //   .catch(handleError(res));
}
//# sourceMappingURL=image.controller.js.map