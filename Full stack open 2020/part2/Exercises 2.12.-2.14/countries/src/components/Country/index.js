import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const Country = props => {
  const { country } = props
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  const [weather, setWeather] = useState({})

  useEffect(() => {
    Axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img width={200} src={country.flag} alt={`${country.name}国旗`}/>
      <h2>Weather</h2>
      <div>
        {Object.keys(weather).length === 0
        ? '等待获取天气...获取不到请检查网络或 weatherstack 的api配置'
        :
        <>
          <p>temperature: {weather.current.temperature}</p>
          <img src={weather.current.weather_icons} alt={`${country.name} 天气`} />
          <p>wind: {weather.current.wind_speed} {weather.current.wind_degree} {weather.current.wind_dir}</p>
        </>}
      </div>
    </div>
  )
}

export default Country
