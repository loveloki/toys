import React, { useState } from 'react'
import Search from '../Search'
import PersonForm from '../PersonForm'
import Persons from '../Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '11111111111' },
    { name: 'a', number: '11111111111' },
    { name: 'hsda', number: '11111111111' },
    { name: 'b', number: '11111111111' },
    { name: 'uihsdbsdd', number: '11111111111' },
    { name: 'sd eedda', number: '11111111111' },
    { name: 'feed', number: '11111111111' },
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const handleChangeName = e => {
    setNewName(e.target.value)
  }

  const HandleChangeNumber = e => {
    setNewNumber(e.target.value)
  }

  const handleChangeSearch = e => {
    setSearch(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const flag = persons.map(person => person.name).includes(newName)

    if (flag) {
      alert(`电话簿中已保存 ${newName}，请重新输入`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>电话簿</h2>
      <Search text={search} handleChange={handleChangeSearch} />
      <PersonForm newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} HandleChangeNumber={HandleChangeNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  )
}

export default App
