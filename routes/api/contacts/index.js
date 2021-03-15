const express = require('express')
const router = express.Router()
const validate = require('./validation')
const contactsController = require('../../../controllers/contacts')

router
  .get('/', contactsController.getContacts)
  .post('/', validate.addContact, contactsController.create)

router
  .get('/:contactId', contactsController.getById)
  .delete('/:contactId', contactsController.remove)
  .put('/:contactId', validate.updateContact, contactsController.update)

router.patch('/:contactId/phone', contactsController.updateContactPhone)

module.exports = router
