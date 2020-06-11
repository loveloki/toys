import React from 'react'

const Country = props => {
  const { country } = props

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
    </div>
  )
}

export default Country
