const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const bookings = require('./bookings.json');
const customers = require('./customers.json');

app.use(cors());

app.get('/', (req, res) => res.status(200).json(bookings));

app.get('/delayed', (req, res) => {
  setTimeout(() => {
    res.json(bookings);
  }, 5000);
});

app.get('/error', (req, res) => {
  res.status(500).send({ error: 'Whoops something went wrong!' });
});

app.get('/customers/:id', (req, res) => {
  const customer = customers.find((customer) => customer.id === Number(req.params.id));
  if (customer) {
    res.status(200).send(customer);
  } else {
    res.status(404).send({ error: 'Cutomer ID not found' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
