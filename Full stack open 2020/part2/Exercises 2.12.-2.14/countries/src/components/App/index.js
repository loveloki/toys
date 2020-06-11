import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Search from '../Search';
import SearchResultList from '../SearchResultList';

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = e => {
    setSearch(e.target.value)
  }

  return (
    <div className="App">
      <Search text={search} handleSearchChange={handleSearchChange} />
      <SearchResultList search={search} countries={countries} />
    </div>
  );
}

export default App;
