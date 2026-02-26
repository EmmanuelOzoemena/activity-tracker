const express = require('express');

const router = express.Router();
const {
  addActivity,
  allActivities,
  getActivityById
} = require('../controllers/activity.controller');

router.post('/', addActivity);
router.get('/', allActivities);
router.get('/:id', getActivityById);

module.exports = router;