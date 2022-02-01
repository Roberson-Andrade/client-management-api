const express = require('express');
const router = new express.Router();
const Client = require('../models/clientSchema');

router.get('/clients', (req, res) => {
  res.json({ hello: 'world' });
});

router.post('/clients', async (req, res) => {
  try {
    const client = await new Client(req.body);

    client.save();
    res.status(200).send();
  }
  catch (error) {
    res.status(500).send();
  }
});

module.exports = router;