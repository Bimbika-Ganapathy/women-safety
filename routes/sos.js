const express = require('express');
const router = express.Router();
const SOS = require('../models/SOS');
const auth = require('../middleware/authMiddleware');

// @route   POST api/sos
// @desc    Send SOS alert
// @access  Private
router.post('/', auth, async (req, res) => {
  const { latitude, longitude, message } = req.body;

  try {
    const sos = new SOS({
      user: req.user.id,
      location: { latitude, longitude },
      message
    });

    await sos.save();
    res.json({ msg: 'SOS Alert sent successfully', sos });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/sos/mine
// @desc    Get all SOS alerts sent by logged-in user
// @access  Private
router.get('/mine', auth, async (req, res) => {
  try {
    const sosList = await SOS.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(sosList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
