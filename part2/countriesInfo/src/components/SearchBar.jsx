function SearchBar({ setSearch }){
  const handleChange = (event) => setSearch(event.target.value)
  return <input onChange={handleChange}/>
}

export default SearchBar