const { populate } = require('./schemas/contact')
const Contact = require('./schemas/contact')

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = '5', offset = '0' }
) => {
  const result = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // name: 1 --- if sortBy = name
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}), // name: -1
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'email subscription -_id',
      },
    }
  )

  const { docs: contacts, totalDocs: total } = result
  return { total: total.toString(), limit, offset, contacts }
}

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'email -_id',
  })
  return result
}

const addContact = async (body) => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  )
  return result
}

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
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
