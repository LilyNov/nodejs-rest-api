const express = require('express')
const router = express.Router()
const Contacts = require('../../model/contacts')
const { addContact, UpdateContact } = require('../api/validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', addContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', UpdateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    )
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId/phone', async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    )
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    } else {
      return res.status(400).json({
        status: 'error',
        code: 400,
        data: 'Missing fields',
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
