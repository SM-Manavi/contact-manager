
const express = require('express');
const router = express.Router();
const contactsController = require('../controller/contacts');

router.get('/', contactsController.getContacts);

router.get('/add-contact', contactsController.addContact);

router.post('/', contactsController.postAdd);

router.get('/:id/edit', contactsController.getEdit);
router.post('/:id/edit', contactsController.postEdit);

router.get('/:id/delete', contactsController.getDelete);

router.get('/search',contactsController.Search)

module.exports = router;