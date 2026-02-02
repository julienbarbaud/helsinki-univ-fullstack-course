const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())


// morgan config
morgan.token('body', (req, res)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

let maxId = persons.length

app.get("/", (_, response) => {
    response.send("This is an api for getting phonebook data\nTry connecting to /api/persons fro the full list")
})

app.get("/api/persons", (request, response)=>{
    response.json(persons)
})

app.get("/info", (_, response) => {
    response.send(`<p>Phonebook has ${persons.length} people in it</p><p>${Date()}</p>`)
})

app.get("/api/persons/:id", (request, response) => {
    const id = request.params.id
    const person = persons.find((person)=>person.id===id)
    if (person) response.json(person)
    else {
        response.statusMessage = `No entry with id ${id}`
        response.status(404).end()
    }
})


app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter((person)=>person.id !== id)
    response.status(204).end()
})


app.post("/api/persons", (request, response) => {
    const person = {
        ...request.body,
        id: Math.floor(Math.random()*1e6).toString()
    }

    // error handling
    if (!person.name) return response.status(400).json({error: "The data must include a non-empty name"})
    //NB: the test below rejects 0 as a number since it is falsy. Leaving it as is, since it is reasonable to consider that 0 is not a valid phone number anyway. 
    if (!person.number) return response.status(400).json({error: "The data must include a number"})
    if (persons.find((registered)=>person.name === registered.name)) return response.status(400).json("This person is already registered")

    persons.push(person)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)



