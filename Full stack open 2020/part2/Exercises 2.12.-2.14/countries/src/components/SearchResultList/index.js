import React from 'react'
import Country from '../Country'
import ControlledShowCountry from '../ControlledShowCountry'


const SearchResultList = props =>{
  const { search, countries } = props
  const list = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
  const len = list.length

  if (len > 10) {
    return <p>结果太多，请更准确点</p>
  } else if (len > 1) {
    return (
      list.map(country => <ControlledShowCountry  key={country.name} country={country} />)
    )
  } else {
    return (
      list.map(country => <Country key={country.name} country={country} />)
    )
  }
}

export default SearchResultList
