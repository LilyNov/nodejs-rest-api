import mongoose from "mongoose";
const { Schema, model } = mongoose;
const bcrypt = require('bcryptjs')
const {Subscription} = require('../../helpers/constants')
const SALT_WORK_FACTOR = 8

const userSchema = new Schema({
    {
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
    default: Subscription.FREE
  },
    token: String,
  owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
}
});

const User = model("user, userSchema);

module.exports = User