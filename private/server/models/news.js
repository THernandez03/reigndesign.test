import mongoose, { Schema } from 'mongoose';

const {
  Types: { ObjectId },
} = Schema;

const schema = new Schema({
  // id: { type: ObjectId },
  // email: { type: String, lowercase: true, unique: true },
  // password: { type: String },
  // name: { type: String },
  // avatar: { type: String },
  // subscriptionId: { type: ObjectId, ref: 'Subscriptions', required: true },
  // devicesId: [{ type: ObjectId, ref: 'Devices' }],
  // token: {
  //   value: { type: String },
  //   tokenTypeId: { type: ObjectId, ref: 'TokenTypes' },
  // },
  // trialExpirationDate: { type: Date, default: Date.now() + defaultTrial },
  // deviceLimit: { type: Number, default: 1 },
  // forgotGUID: { type: String, index: true },
  // registrationGUID: { type: String, required: true, unique: true, default: v4 },
  // status: { type: Boolean, default: false },
});

export default mongoose.model('Users', schema, 'Users');
