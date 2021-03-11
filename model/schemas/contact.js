const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for a contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for a contact'],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, 'Set name for a contact'],
    },
  },
  { versionKey: false, timestamps: true }
)

contactSchema.virtual('id').get(function () {
  return this._id
})

const Contact = model('contact', contactSchema)

module.exports = Contact
