const express = require('express');
const { analyzeSymptoms } = require('../controllers/aiController.js');

const router = express.Router();

router.post('/analyze', analyzeSymptoms);

module.exports = router;
