import { useEffect, useState } from "react"
import axios from 'axios'
import ResultSection from "./components/ResultSection"
import constants from "./constants"
import SearchBar from "./components/SearchBar"


function App() {
  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')

  // logic to get initial country list from the api or local cache
  useEffect( () => {
    console.log("retrieving country list")
    const storedData = localStorage.getItem(constants.COUNTRY_LIST_CACHE_KEY)
    if (storedData) {
      // if the country list is retrieved from cache, initialize variable:
      setCountries(JSON.parse(storedData))
      console.log("retrieved country list from cache")
    }
    else {
      // if no country list in cache, fetch full list from the api (crazy slow)
      console.log("no country list in cache, fetching from api")
      axios
        .get(constants.COUNTRY_API_BASE_URL + "all")
        .then((resp)=> {
          const apiCountries = resp.data.map((country)=>country.name.common)
          localStorage.setItem(constants.COUNTRY_LIST_CACHE_KEY, JSON.stringify(apiCountries))
          setCountries(apiCountries)
          console.log("successfully fetched and cached api data")
        })


    }
  }, [])
    
  // temporary display until data loads
  if (countries === null) return <p>Initial data loading... (this can take up to a minute)</p>

  // filtering of the countries:
  const countriesToShow = countries.filter((country)=>country.toLowerCase().includes(search.toLowerCase()))
  
  return(
    <>
    <h1>Country wiki</h1>
    <h2>Search:</h2>
    <SearchBar setSearch={setSearch}></SearchBar>
    <h2>Results:</h2>
    <ResultSection countries={countriesToShow}></ResultSection>
    </>
  )
}

export default App
