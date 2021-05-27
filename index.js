const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ bye: 'buddy' });
});

// look at underlying env and see if they declared a port for us (heroku, prod) to use, otherwise use value 5000 (development)
const PORT = process.env.PORT || 5000;
app.listen(PORT);