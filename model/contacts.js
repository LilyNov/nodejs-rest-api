const db = require('./db')
const { ObjectID } = require('mongodb')

const getCollection = async (db, name) => {
  const client = await db
  const collection = await client.db().collection(name)
  return collection
}

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts')
  const results = await collection.find({}).toArray()
  return results
}

const getContactById = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const ObjectId = new ObjectID(contactId)
  console.log(ObjectId.getTimestamp())

  const [result] = await collection.find({ _id: ObjectId }).toArray()
  return result
}

const addContact = async (body) => {
  const record = {
    ...body,
  }
  const collection = await getCollection(db, 'contacts')
  const {
    ops: [result],
  } = await collection.insertOne(record)
  return result
}

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts')
  const ObjectId = new ObjectID(contactId)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: ObjectId },
    { $set: body },
    { returnOriginal: false }
  )
  return result
}

const removeContact = async (contactId) => {
  const collection = await getCollection(db, 'contacts')
  const ObjectId = new ObjectID(contactId)
  const { value: result } = await collection.findOneAndDelete({
    _id: ObjectId,
  })
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
