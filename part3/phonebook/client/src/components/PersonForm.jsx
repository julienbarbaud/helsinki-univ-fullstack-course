import { useState } from "react"
import axios from 'axios'
import connection from "../services/connection"

const PersonForm = ({ persons, setPersons, setNotif }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const isValid = () => {
    // function to do some basic checks on the input upon submission 
    // (NB: this function made more sense before the duplicate logic change, but could still be useful for logic extensions)
    if (newName === ''){
      // ignoring empty inputs
      alert("Please enter a name before submitting")
      return false
    }
    return true
  }

  const displayNotif = (message) => {
    setNotif({
      text: message,
      isError: false
    })
    setTimeout(
      () => setNotif(null),
      4000 
    )
  }

  const handleDuplicates = (duplicate, num) => {
    console.log("found duplicate:", duplicate)
    if (!window.confirm(`${newName} is already registered. Do you wanna update his number?`)) return
    const newPerson = {...duplicate, number: num}
    connection
      .updatePerson(newPerson)
      .then( () => {
        setPersons(persons.map(
          (person)=> person.id === newPerson.id ? newPerson : person
        ))
        setNewName('')
        setNewNumber('')
        displayNotif(`Updated ${newPerson.name}'s information!`)
      })
  }

  const handleSubmission = (event) => {
    event.preventDefault()
    if (!isValid()) return

    // placeholder in case of an empty number
    const num = newNumber === '' ? "no number" : newNumber
    //handling duplicate logic:
    const duplicate = persons.find((user)=>user.name === newName)
    if (duplicate !== undefined) {
      handleDuplicates(duplicate, num)
      return
    }

    const newPerson = {
      name: newName,
      number: num
    }

    connection
      .postNew(newPerson)
      .then(personResponse => {
        console.log(personResponse)
        displayNotif(`Registered ${newPerson.name} in the phonebook!`) 
        setPersons(persons.concat(personResponse))
        setNewName('')
        setNewNumber('')  
      })

  }

  return(
    <form onSubmit={handleSubmission}>
      <div>
        name: <input value={newName} onChange={(e)=>setNewName(e.target.value)}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={(e)=>setNewNumber(e.target.value)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm