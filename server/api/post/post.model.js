'use strict';

import mongoose from 'mongoose';

var PostSchema = new mongoose.Schema({
  	type: String,
  	active: Boolean,
	properties: {
		created_at : {type: Date, default: Date.now},
		user: String,
		icon: String,
		markerColor: String,
		title:String,
		message:String,
		distance: Number,
	},
	geometry: Schema.Types.Mixed
});

export default mongoose.model('Post', PostSchema);
