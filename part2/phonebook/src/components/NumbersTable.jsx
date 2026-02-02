import connection from "../services/connection"

const PersonLine = ({ person, handler }) => {  
  return(
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={handler}>delete</button></td>
    </tr>
  )
}


const NumbersTable = ({ personsToShow, persons, setPersons, setNotif }) => {
  const handleDelete = (id) => () => {
    console.log(`deleting id ${id}`)
    const name = persons.find((p)=>p.id===id).name
    // asking confirmation
    if (!window.confirm(`do you really want to delete ${name}`)) return
    
    connection
      .deleteId(id)
      .then((data)=> {
        console.log(data) // DELETE response body is empty
      })
      .catch( () => {
        console.log("catching exception while attemtping to delete")
        setNotif({
          text: `${name} already couldn't be found on the server!`,
          isError: true
        })
        setTimeout(
          () => setNotif(null),
          4000
        )
      })
      .finally(() => setPersons(persons.filter((person)=>person.id !== id)))
  }

  return(
    <table>
      <tbody>
        {personsToShow.map(
          (person)=><PersonLine key={person.id} person={person} handler={handleDelete(person.id)}/>
        )}
      </tbody>
    </table>
  )
}

export default NumbersTable