const express = require('express');
const router = express.Router();
const redis = require('redis');

// Create Redis Client
const client = redis.createClient();

client.on('error', err => console.log(`Redis Error: ${err}`));
client.on('connect', () => console.log('Connected to Redis'));

// Search Page
router.get('/', (req, res, next) => {
  res.render('searchusers');
})

// Search for users
router.post('/users/search', (req, res, next) => {
  let user_id = req.body.id;

  client.hgetall(user_id, (err, obj) => {
    if(!obj) {
      res.render('searchusers', {
        error: 'User does not exist'
      });
    }
    else {
      // The object does NOT have an id property, so we assign it to it
      obj.id = user_id;
      // For debugging
      console.log(obj);

      res.render('details', { user: obj });
    }
  })
})

// Add Users page
router.get('/users/add', (req, res, next) => {
  res.render('adduser');
})

// Process Add User
router.post('/users/add', (req, res, next) => {
  const user_id = req.body.id;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;

  client.hmset(user_id, [
    'first_name', first_name,
    'last_name', last_name,
    'email', email,
    'phone', phone
  ], (err, reply) => {
    if (err) {
      console.log(err);
    }
    console.log(reply);
    res.redirect('/');
  })

})

// Process Remove User
router.delete('/user/delete/:id', (req, res, next) => {
  client.del(req.params.id);
  res.redirect('/');
})


module.exports = router;