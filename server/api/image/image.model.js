'use strict';

import mongoose from 'mongoose';
import {Schema} from 'mongoose';

var ImageSchema = new mongoose.Schema({
	type: String,
	active: Boolean,
	img: { data: Buffer, contentType: String },
});

export default mongoose.model('Image', ImageSchema);
