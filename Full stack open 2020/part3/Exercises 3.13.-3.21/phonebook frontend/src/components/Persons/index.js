import React from 'react'
import Note from '../Note'

const Persons = props => {
  const { persons, search, deletePerson } = props

  return (
    <>
    { persons
      .filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
      .map(person => <Note key={person.name} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id, person.name)} />)
    }
    </>
  )
}

export default Persons
