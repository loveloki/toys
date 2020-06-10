import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div className="App">
      {countries.map(country => <p key={country.numericCode}>{country.name}</p>)}
    </div>
  );
}

export default App;
