/**
 * Post model events
 */

'use strict';

import {EventEmitter} from 'events';
import Post from './post.model';
var PostEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PostEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Post.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PostEvents.emit(event + ':' + doc._id, doc);
    PostEvents.emit(event, doc);
  }
}

export default PostEvents;
