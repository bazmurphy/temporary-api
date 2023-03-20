const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const bookings = require("./bookings.json");

app.get("/", (req, res) => res.status(200).json(bookings));

app.get("/delayed", (req, res) => {
  setTimeout(() => {
    res.json(bookings);
  }, 5000);
});

app.get("/error", (req, res) => {
  res.status(500).send({ error: "Whoops something went wrong!" });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
