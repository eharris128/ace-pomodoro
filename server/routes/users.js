const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

router.use(bodyParser.json());

// Get all users from DB
router.get('/', (req, res) => {
  // http://expressjs.com/en/4x/api.html#app.locals
  // app.locals is an object that has local variables
  // throughout the life of the app
  // access the object via `req.app.whatever-property`
  return req.app.locals.knex.select().from('users')
    .then(result => {
      res.status(200).json(result);
    });
});

// Query single user from DB
router.get('/:id', (req, res) => {
  // What occurs in here depends on postgres data structure
  return res.status(200).json({name: 'bobby'});
});

// Create a new user in DB 
router.post('/', (req, res) => {
  let hashedPassword;

  bcrypt.hash(req.body.password, 10)
    .then(result => {
      hashedPassword = result;

      return req.app.locals.knex
        .insert({
          username: req.body.username,
          password: hashedPassword
        })
        .into('users')
        .returning([
          'username',
          'password'
        ]);
    })
    .then(result => {
      res.status(201).send(result);
    })
    .catch(error => {
      res.status(500).json({ message: 'error creating user' });
    });

  // const requiredFields = ['username', 'password', 'email'];
  // const missingIndex = requiredFields.findIndex(field => !req.body[field]);
  // if (missingIndex !== -1) {
  //   return res.status(400).json({
  //     message: `Missing field: ${requiredFields[missingIndex]}`
  //   });
  // }

  // let {username, password, email} = req.body;
  // username = username.trim();
  // password = password.trim();
  // return res.status(201).json(req.body);
});

// Alter user data - should require auth
router.put('/:id', (req, res) => {
  return res.status(204).json({name: 'bobbed'});
});

// Delete user data - require auth
router.delete('/:id', (req, res) => {
  return res.status(204).end();
});

module.exports = router;