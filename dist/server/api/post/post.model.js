'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = new _mongoose2.default.Schema({
	type: String,
	active: Boolean,
	properties: {
		created_at: { type: Date, default: Date.now },
		user: { type: _mongoose.Schema.Types.ObjectId, ref: 'User' },
		dateTaken: { type: Date },
		image: [{ type: _mongoose.Schema.Types.ObjectId, ref: 'Image' }],
		//	thumb : { type: Schema.Types.ObjectId, ref: 'Image' },
		message: String,
		title: String,
		subTitle: String,
		markerColor: String,
		icon: String
	},
	geometry: _mongoose.Schema.Types.Mixed
});

exports.default = _mongoose2.default.model('Post', PostSchema);
//# sourceMappingURL=post.model.js.map
