import React, { useState, useEffect } from 'react'
import Search from '../Search'
import PersonForm from '../PersonForm'
import Persons from '../Persons'
import PhoneBookService from '../../services/phoneBook'

const App = () => {
  const [ persons, setPersons ] = useState([])

  useEffect(() => {
    PhoneBookService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

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
      PhoneBookService
        .create({name: newName, number: newNumber})
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
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
