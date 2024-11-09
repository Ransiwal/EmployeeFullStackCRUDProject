const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();


router.post('/create', async (req, res) => {
    try {
        const { name, email, mobileNo, designation, gender, course, image } = req.body;
        
        const newEmployee = new Employee({ name, email, mobileNo, designation, gender, course, image });
        
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json({ message: 'Employee deleted successfully', deletedEmployee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, mobileNo, designation, gender, course, image } = req.body;
        
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, email, mobileNo, designation, gender, course, image },
            { new: true }
        );
        
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/all', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const employee = await Employee.findById(id);
        
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
