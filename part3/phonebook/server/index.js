require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const dbService = require('./dbService/mongoService');

const app = express();
app.use(express.json());
app.use(express.static('dist'));

// morgan config
morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'));

app.get('/', (_, response) => {
  response.send('This is an api for getting phonebook data\nTry connecting to /api/persons for the full list');
});

app.get('/api/persons', (request, response) => {
  // a real app would probably catch db connection errors here, but the exercises didn't require it
  dbService
    .getAll()
    .then((persons) => response.json(persons));
});

app.get('/info', (_, response) => {
  dbService
    .getEntriesLength()
    .then(response.send(`<p>Phonebook has ${dbService.getEntriesLength()} people in it</p><p>${Date()}</p>`));
});

app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params;
  dbService
    .getId(id)
    .then((person) => {
      if (person) return response.json(person);
      response.statusMessage = `No entry with id ${id}`;
      return response.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  dbService
    .deleteId(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const person = request.body;
  dbService
    .addPerson(person)
    .then((dbPerson) => response.json(dbPerson))
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  dbService
    .updatePerson(request.params.id, request.body)
    .then((person) => response.json(person))
    .catch((error) => next(error));
});

// error handler middleware:
// eslint-disable-next-line consistent-return
app.use((error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send(`<h1>Database error</h1><p>${error.value} is not a valid id<p>`);
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ message: error.message });
  }
  next(error);
});

app.listen(process.env.PORT);
