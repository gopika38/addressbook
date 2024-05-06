const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// MongoDB Configuration 
const mongoURI = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

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
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Get all Addresses
app.get('/addresses', (req, res) => {
    Address.find()
        .then(addresses => res.json(addresses))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Update Address
app.put('/address/:id', (req, res) => {
    Address.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(address => res.json(address))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Delete Address
app.delete('/address/:id', (req, res) => {
    Address.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json({ success: true }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));
