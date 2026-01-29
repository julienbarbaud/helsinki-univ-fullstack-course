import { useState } from "react"

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleEdgeCases = () => {
    // function to do some basic checks on the input upon submission
    if (newName === ''){
      // ignoring empty inputs
      alert("Please enter a name before submitting")
      return
    }
    if (persons.find((user)=>user.name === newName) !== undefined){
      // preventing duplicates
      alert(`${newName} is already registered in the phonebook`)
      return
    }
  }

  const handleSubmission = (event) => {
    event.preventDefault()
    handleEdgeCases()
    // placeholder in case of an empty number
    const num = newNumber === '' ? "no number" : newNumber

    const newPerson = {
      name: newName,
      number: num
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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