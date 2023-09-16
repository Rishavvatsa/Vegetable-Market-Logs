const Contact=require("../models/ContactModel");
const createContact = async (req, res) => {
    try {
      const { name, email, message } = req.body;
      
    
      const newContact = new Contact({ name, email, message });
      await newContact.save();
  
      res.status(201).json({ message: 'Contact message sent successfully' });
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ message: 'Failed to send contact message' });
    }
  };
  
  module.exports = { createContact };