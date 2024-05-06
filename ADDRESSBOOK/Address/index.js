// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// MongoDB Configuration
const mongoURI = 'mongodb://localhost:27017/addressbook';
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Address Model
const Address = require('./models/Address');

// Create Address
app.post('/address', (req, res) => {
  const newAddress = new Address({
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    country: req.body.country
  });

  newAddress.save()
    .then(address => res.json(address))
    .catch(err => res.status(400).json({ error: err }));
});

// Get all Addresses
app.get('/addresses', (req, res) => {
  Address.find()
    .then(addresses => res.json(addresses))
    .catch(err => res.status(400).json({ error: err }));
});

// Update Address
app.put('/address/:id', (req, res) => {
  Address.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(address => res.json(address))
    .catch(err => res.status(400).json({ error: err }));
});

// Delete Address
app.delete('/address/:id', (req, res) => {
  Address.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.status(400).json({ error: err }));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
