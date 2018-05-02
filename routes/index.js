const express = require('express');
const router = express.Router();

// Search Page
router.get('/', (req, res, next) => {
  res.render('searchusers');
})

router.post('/users/search', (req, res, next) => {
  let id = req.body.id;
})


module.exports = router;