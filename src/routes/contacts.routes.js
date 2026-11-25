
const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();
const controller = require('../controllers/contacts.controller');

const contactsLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 50
});

router.use(contactsLimiter);

router.get('/stats/summary', controller.getContactStats);

router.get('/', controller.getAllContacts);

router.get('/:id', controller.getContactById);

router.post('/', controller.createContact);

router.put('/:id', controller.updateContact);

router.patch('/:id/favorite', controller.toggleFavorite);

router.delete('/:id', controller.deleteContact);

module.exports = router;
