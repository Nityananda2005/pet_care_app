const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Appointment = require('../models/appointment');

router.get('/dump', async (req, res) => {
    const vets = await User.find({ role: 'vet' });
    const appointments = await Appointment.find().populate('owner vet pet');
    res.json({ vets, appointments });
});

module.exports = router;
