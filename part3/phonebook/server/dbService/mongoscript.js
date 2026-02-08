/* eslint-disable no-console */
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('error: please provide password in command line');
  process.exit(1);
}

const pwd = process.argv[2];
const url = `mongodb+srv://fullstack:${pwd}@cluster0.ilzs0iq.mongodb.net/phoneBook?appName=Cluster0`;

mongoose.connect(url, {
  family: 4,
  monitorCommands: true,
  bufferTimeoutMS: 45000,
  serverSelectionTimeoutMS: 45000,
  socketTimeoutMS: 60000,
});

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('person', personSchema);

if (process.argv.length === 3) {
  // in this case we only want to display the people already registered in db:
  Person
    .find({})
    .then((result) => {
      console.log('People in the phonebook:');
      console.log(result);
      mongoose.connection.close();
    });
} else if (process.argv.length >= 5) {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  newPerson
    .save()
    .then(() => {
      console.log('registered new user in db');
      mongoose.connection.close();
    });
}
