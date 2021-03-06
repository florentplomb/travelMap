'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var PostSchema = new mongoose.Schema({
	type: String,
	active: Boolean,
	properties: {
		created_at : {type: Date, default: Date.now},
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		dateTaken: {type: Date},
		image : [{ type: Schema.Types.ObjectId, ref: 'Image' }],
	//	thumb : { type: Schema.Types.ObjectId, ref: 'Image' },
		message:String,
		title:String,
		subTitle:String,
		markerColor: String,
		icon: String
	},
	geometry: Schema.Types.Mixed
});

export default mongoose.model('Post', PostSchema);
