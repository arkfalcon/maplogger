const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const fs = require('fs');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());


app.get('/markers', (req, res) => {
  const data = JSON.parse(fs.readFileSync('markers.json'));
  res.json(data);
});

app.post('/markers', (req, res) => {
  fs.writeFileSync('markers.json', JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
