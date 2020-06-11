import React, { useState } from 'react'
import Country from '../Country'

const ControlledShowCountry = props => {
  const { country } = props
  const [show, setShow] = useState(false)

  return (
    <div>
      {country.name}
      <button onClick={() => setShow(!show)} >{show ? 'hide' : 'show'}</button>
      {show && <Country key={country.name} country={country} />}
    </div>
  )
}

export default ControlledShowCountry
