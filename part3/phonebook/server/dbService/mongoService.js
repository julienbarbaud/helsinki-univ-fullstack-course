const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL, { family: 4 });

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (num) => /^\d{2,3}-\d+$/.test(num), // regex to ensure 2-3 numbers + dash + numbers
      message: 'the phone number is not properly formatted',
    },
  },
});

personSchema.set('toJSON', {
  virtuals: true, // the id field is already included in virtual fields
  transform: (before, after) => {
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete after._id;
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    delete after.__v;
  },
});

const Person = mongoose.model('person', personSchema);

const getAll = () => Person.find({});

const getId = (id) => Person.findById(id);

const getNumberOfEntries = () => getAll.then((persons) => persons.length);

const addPerson = (personData) => {
  const person = new Person(personData);
  return person.save();
};

const deleteId = (id) => Person.findByIdAndDelete(id);

const updatePerson = (id, newPerson) => Person
  .findById(id)
  .then((person) => {
    const updatedPerson = person;
    updatedPerson.name = newPerson.name;
    updatedPerson.number = newPerson.number;
    return updatedPerson.save();
  });

module.exports = {
  getAll,
  getId,
  getEntriesLength: getNumberOfEntries,
  addPerson,
  deleteId,
  updatePerson,
};
