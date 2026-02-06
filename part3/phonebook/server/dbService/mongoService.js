const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_DB_URL, {family: 4})

const personSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength: 3
    },
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: num => /^\d{2,3}-\d+$/.test(num),
            message: "the phone number is not properly formatted"
        }
    }
})

personSchema.set("toJSON", {
    virtuals: true,
    transform: (before, after) =>{
        delete after._id
        delete after.__v
    }
})

const Person = mongoose.model("person", personSchema)

const getAll = () => Person.find({})

const getId = id => Person.findById(id)

const getEntriesLength = () => getAll.then(persons=>persons.length)

const addPerson = (personData) => {
    const person = new Person(personData)
    return person.save()
}

const deleteId = id => Person.findByIdAndDelete(id)

const updatePerson = (id, newPerson) => {
    return Person
        .findById(id)
        .then(person => {
            person.name = newPerson.name
            person.number = newPerson.number
            console.log(person)
            return person.save()
        })
}

module.exports = {
    getAll,
    getId, 
    getEntriesLength,
    addPerson,
    deleteId,
    updatePerson
}