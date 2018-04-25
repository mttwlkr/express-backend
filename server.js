const express = require('express');
const app = express();
const path = require('path');
const bacon = require('./public/bacon.js')

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
}

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
}

app.use(urlLogger, timeLogger);
app.use(express.static('public'));

app.get('/', (request, response) => {
  // We don't need to explicitly use this handler or send a response
  // because Express is using the default path of the static assets
  // to serve this content
});

app.get('/json', (request, response) => {
  // response.status(200).json({"name": "Matt"})
  response.status(200).json(bacon.ipsum)
})

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});

app.get('/sunsets', (request, response) => {
  response.sendFile(path.join(__dirname, 'public/sunsets.html'));
})

app.use((request, response) => {
  response.status(404).send("Sorry can't find that!")
})


