const express = require('express');
const router = express.Router();
const diskController = require('../controllers/diskController');

router.post('/scan', diskController.calculateScan);
router.post('/cscan', diskController.calculateCscan);
router.post('/sstf', diskController.calculateSstf);

module.exports = router;
