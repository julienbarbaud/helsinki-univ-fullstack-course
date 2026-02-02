import { useState, useEffect, Fragment } from "react"
import CountryDetails from "./CountryDetails"
import constants from "../constants"

function ResultSection({ countries, setCountries }) {
  const [displayFlags, setDisplayFlags] = useState([])

  // re-initialize the display flags everytime the search changes
  useEffect(()=>setDisplayFlags(Array(countries.length).fill(false)), [countries])

  if (countries.length > constants.DISPLAY_LIMIT) return <p>Too many countries to display, please refine search</p>
  if (countries.length == 0) return <p>No matches</p>
  if (countries.length == 1) return <CountryDetails countryName={countries[0]}></CountryDetails>

  // if list of countries > 1 and < 10, display the list:
  const handleClick = (event) => {
    const newDisplayFlags = [...displayFlags]
    const i = event.target.getAttribute("index")
    newDisplayFlags[i] = !displayFlags[i]
    setDisplayFlags(newDisplayFlags)
  }

  return(
    <table>
      <tbody>
        {countries.sort().map((country, i)=>{
          return(
            <Fragment key={country}>
              <tr>
                <td>{country}</td>
                <td><button index={i} onClick={handleClick}>{displayFlags[i] ? "hide" : "display"}</button></td>
              </tr>
              {displayFlags[i] ? <tr><td colSpan="2"><CountryDetails countryName={country}/></td></tr> : null}
            </Fragment>
          )
        })}
      </tbody>
    </table>
  )
}

export default ResultSection