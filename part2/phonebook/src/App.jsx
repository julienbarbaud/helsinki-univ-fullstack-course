import { useState } from 'react'
import NumbersTable from './components/NumbersTable.jsx'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'


const App = () => {
  // not using ids for the person object. Since name is enforced to be unique, it can be used as id.
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:"111-1111111" },  
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  const [filterKey, setFilterKey] = useState('')  

    const personsToShow = persons.filter( (person) =>
      person.name.toLowerCase().includes(filterKey.toLowerCase())
    )

  return (
    <div>
      <h1>Phonebook</h1>
        <Filter setFilterKey={setFilterKey}/>
      <h2>Add a new person</h2>
        <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
        <NumbersTable persons={personsToShow}/>
    </div>
  )
}

export default App