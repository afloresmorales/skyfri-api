const express = require('express');
const cors = require('cors');
const mongoDb = require('./db/config'); //only able to connect if ip is authorized

const PORT = process.env.PORT || 3080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require('./endpoints/index'));

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// perform a database connection when the server starts
mongoDb.connectToServer();
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});