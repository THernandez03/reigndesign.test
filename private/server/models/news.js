import mongoose from 'mongoose';

const { Schema } = mongoose;

/* eslint-disable camelcase */
const schema = new Schema({
  objectID: { type: String, required: true, index: true, unique: true },
  story_url: { type: String },
  story_title: { type: String },
  url: { type: String },
  title: { type: String },
  author: { type: String },
  created_at: { type: Date },
  created_at_i: { type: Number },
  status: { type: Boolean },
});

export default mongoose.model('News', schema, 'News');
