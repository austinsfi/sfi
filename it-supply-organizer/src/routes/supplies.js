const express = require('express');
const router = express.Router();
const suppliesController = require('../controllers/suppliesController');

// Route to add a new supply item
router.post('/supplies', suppliesController.addSupply);

// Route to get all supply items
router.get('/supplies', suppliesController.getSupplies);

// Route to update a supply item
router.put('/supplies/:id', suppliesController.updateSupply);

// Route to delete a supply item
router.delete('/supplies/:id', suppliesController.deleteSupply);

module.exports = router;