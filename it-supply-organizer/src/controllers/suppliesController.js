const Supply = require('../models/supply');

// Function to add a new supply item
exports.addSupply = async (req, res) => {
    try {
        const { location, itemName, quantity } = req.body;
        const newSupply = new Supply({ location, itemName, quantity });
        await newSupply.save();
        res.status(201).json({ message: 'Supply item added successfully', supply: newSupply });
    } catch (error) {
        res.status(500).json({ message: 'Error adding supply item', error: error.message });
    }
};

// Function to get all supplies
exports.getSupplies = async (req, res) => {
    try {
        const supplies = await Supply.find();
        res.status(200).json(supplies);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving supplies', error: error.message });
    }
};

// Function to update a supply item
exports.updateSupply = async (req, res) => {
    try {
        const { id } = req.params;
        const { location, itemName, quantity } = req.body;
        const updatedSupply = await Supply.findByIdAndUpdate(id, { location, itemName, quantity }, { new: true });
        if (!updatedSupply) {
            return res.status(404).json({ message: 'Supply item not found' });
        }
        res.status(200).json({ message: 'Supply item updated successfully', supply: updatedSupply });
    } catch (error) {
        res.status(500).json({ message: 'Error updating supply item', error: error.message });
    }
};

// Function to delete a supply item
exports.deleteSupply = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSupply = await Supply.findByIdAndDelete(id);
        if (!deletedSupply) {
            return res.status(404).json({ message: 'Supply item not found' });
        }
        res.status(200).json({ message: 'Supply item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting supply item', error: error.message });
    }
};