const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const grammarRoutes = require('./routes/grammarRoute');
const bardRoutes = require('./routes/bardRoute');
app.use(cors());
app.use(bodyParser.json());

app.use('/grammar', grammarRoutes);
app.use('/ai', bardRoutes);

app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
});

const port = 8000;

app.listen(port, () => {
  console.log(`The server is running at ${port}`)
})