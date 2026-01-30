import { useState } from 'react'
import NumbersTable from './components/NumbersTable.jsx'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import { useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filterKey, setFilterKey] = useState('')  

  useEffect(()=>{
    axios
      .get("http://localhost:3001/persons")
      .then((resp)=>{
        console.log(`received response data:\n ${JSON.stringify(resp.data)}}`)
        setPersons(resp.data)
      })
  }, [])

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