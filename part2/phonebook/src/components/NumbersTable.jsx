const PersonLine = ({ person }) => {
  return(
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  )
}


const NumbersTable = ({ persons }) => {
  return(
    <table>
      <tbody>
        {persons.map((person)=><PersonLine key={person.name} person={person}/>)}
      </tbody>
    </table>
  )
}

export default NumbersTable