const Filter = ({ setFilterKey }) => {
  const handleInputChange = (event) => setFilterKey(event.target.value)
  return <div>filter the phonebook: <input onChange={handleInputChange}/></div>
}

export default Filter