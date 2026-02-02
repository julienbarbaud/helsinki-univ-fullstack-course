import { useState } from 'react'
import NumbersTable from './components/NumbersTable.jsx'
import PersonForm from './components/PersonForm.jsx'
import Filter from './components/Filter.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import connection from './services/connection.js'
import Notification from './components/Notification.jsx'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filterKey, setFilterKey] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)   

  useEffect(()=>{
    connection
      .getAll()
      .then((personsResponse)=>{
        console.log(`received response data:\n ${JSON.stringify(personsResponse)}}`)
        setPersons(personsResponse)
      })
  }, [])

  const personsToShow = persons.filter( (person) =>
    person.name.toLowerCase().includes(filterKey.toLowerCase())
  )

  return (
    <div>
      <Notification message={notifMessage}/>
      <h1>Phonebook</h1>
        <Filter setFilterKey={setFilterKey}/>
      <h2>Add a new person</h2>
        <PersonForm persons={persons} setPersons={setPersons} setNotif={setNotifMessage}/>
      <h2>Numbers</h2>
        <NumbersTable personsToShow={personsToShow} persons={persons} setPersons={setPersons} setNotif={setNotifMessage}/>
    </div>
  )
}

export default App