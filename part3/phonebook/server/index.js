const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const morgan = require("morgan")
const dbService = require("./dbService/mongoService")


const app = express()
app.use(express.json())
app.use(express.static('dist'))


// morgan config
morgan.token('body', (req, res)=>JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))

// let persons = [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// let maxId = persons.length

app.get("/", (_, response) => {
    response.send("This is an api for getting phonebook data\nTry connecting to /api/persons fro the full list")
})

app.get("/api/persons", (request, response)=>{
    dbService
        .getAll()
        .then(persons=>response.json(persons))
})

app.get("/info", (_, response) => {
    dbService
        .getEntriesLength()
        .then(response.send(`<p>Phonebook has ${dbService.getEntriesLength()} people in it</p><p>${Date()}</p>`))    
})

app.get("/api/persons/:id", (request, response, next) => {
    const id = request.params.id
    dbService
        .getId(id)
        .then(person=>{
            if (person) response.json(person)
            else {
                response.statusMessage = `No entry with id ${id}`
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})


app.delete("/api/persons/:id", (request, response, next) => {
    dbService
        .deleteId(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
    const person = request.body
    // // error handling
    // if (!person.name) return response.status(400).json({error: "The data must include a non-empty name"})
    // //NB: the test below rejects 0 as a number since it is falsy. Leaving it as is, since it is reasonable to consider that 0 is not a valid phone number anyway. 
    // if (!person.number) return response.status(400).json({error: "The data must include a number"})
    
    dbService
        .addPerson(person)
        .then(dbPerson=>response.json(dbPerson))
        .catch(error => next(error))
})


app.put("/api/persons/:id", (request, response, next) => {
    dbService
        .updatePerson(request.params.id, request.body)
        .then(person => response.json(person))
        .catch(error => next(error))
})


// error handler middleware:
app.use((error, request, response, next) => {
    if (error.name === "CastError"){
        return response.status(400).send(`<h1>Database error</h1><p>${error.value} is not a valid id<p>`)
    } 
    if (error.name === "ValidationError") {
        return response.status(400).json({"message": error.message})
    }
    next(error)
})

const PORT = process.env.PORT 
app.listen(PORT)



