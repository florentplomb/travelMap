'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var ImageSchema = new mongoose.Schema({
	
	img: { data: Buffer, contentType: String },
	thumb: { type: Schema.Types.ObjectId, ref: 'Image' }
});

export default mongoose.model('Image', ImageSchema);
