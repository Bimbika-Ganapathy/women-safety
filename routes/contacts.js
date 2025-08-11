const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   POST api/contacts
// @desc    Add emergency contact & return updated list
// @access  Private
router.post('/', auth, async (req, res) => {
  console.log('Incoming body:', req.body);
  const { contact } = req.body;

  if (!contact) {
    return res.status(400).json({ msg: 'Contact number is required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Prevent duplicate contacts
    if (user.emergencyContacts.includes(contact)) {
      return res.status(400).json({ msg: 'Contact already exists' });
    }

    // Add contact
    user.emergencyContacts.push(contact);
    await user.save();

    // Return the updated contact list directly
    res.json(user.emergencyContacts);
  } catch (err) {
    console.error('Error adding contact:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
