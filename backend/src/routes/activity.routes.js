const express = require('express');

const router = express.Router();
const {
  addActivity,
  allActivities,
} = require('../controllers/activity.controller');

router.post('/', addActivity);
router.get('/', allActivities);

module.exports = router;