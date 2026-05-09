
const express = require('express');
const cors = require('cors');
const path = require('path');
const authController = require('./controller/authController');

// app.post('/login', authController.login);

const pollController = require('./controller/pollController');

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../Frontend')));
app.post('/login', authController.login);

app.post('/polls', pollController.createPoll);
app.get('/polls', pollController.getPolls);
app.post('/polls/:id/vote', pollController.vote);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});