import axios from "axios"
import constants from "../constants"
import { useEffect, useState } from "react"


function WeatherSection({ city  }) {
    const [weatherData, setWeatherData] = useState(null)
    const apiKey = import.meta.env.VITE_API_KEY

    // helper fucntion to convert from farenheit to a sensible unit 
    const KtoC = kelvin => kelvin - 273.15

    useEffect(()=>{
        console.log("fetching weather data")
        axios
            .get(constants.WEATHER_API_BASE_URL + city + "&appid=" + import.meta.env.VITE_API_KEY)
            .then((resp) => {
                console.log("obtained weather data from api")
                setWeatherData(resp.data)
            })
    }, [])

    if (weatherData === null) return null

    const iconUrls =  weatherData.weather.map((condition) => {
        //handling the fact that the recommended api is retarded and has arbitrary url formatting for its icons:
        let iconId = condition.icon
        if (["03", "09", "11", "13", "50"].includes(iconId.slice(0,2))){
            iconId = iconId.slice(0,2) + "d_n"
        }
        else if (iconId === "04n") iconId = "04d"
    
        return constants.ICONS_BASE_URL + iconId + ".png"
    })
    console.log("weather icon urls:", iconUrls)
    return(
        <>
            <h3>Weather in {city}</h3>
            <p>Temperature: {KtoC(weatherData.main.temp)} Celsius</p>
            {iconUrls.map((url) => <img key={url} src={url}></img>)}
            <p>Wind speed: {weatherData.wind.speed}m/s</p>
        </>
    )

}


function CountryDetails({ countryName }){
  const [country, setCountry] = useState(null)

  useEffect( () => {
    axios
      .get(constants.COUNTRY_API_BASE_URL + "/name/" + countryName)
      .then((resp) => {
        console.log(`successfully fetched data for ${countryName}`)
        setCountry(resp.data)
      })
  }, [countryName])

  if (country === null) return <p>Loading data for {countryName}...</p>

  const containerStyle = {
    marginLeft: "50px", 
    marginRight: "50px", 
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    background: "lightgrey"}
  return(
    <div style={containerStyle}>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Surface Area: {country.area}km^2</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((lang)=><li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <WeatherSection city={country.capital}/>
    </div>
  )
}

export default CountryDetails