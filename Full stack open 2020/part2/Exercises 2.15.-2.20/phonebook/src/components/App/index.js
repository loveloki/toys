import React, { useState, useEffect } from 'react'
import Search from '../Search'
import PersonForm from '../PersonForm'
import Persons from '../Persons'
import PhoneBookService from '../../services/phoneBook'
import phoneBook from '../../services/phoneBook'
import Notification from '../Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [type, setType] = useState('success')
  const [message, setMessage] = useState('')

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

  const showMessage = (message, type) => {
    setMessage(message)
    setType(type)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

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
      const flag = window.confirm(`电话簿中已保存 ${newName}，是否覆盖?`)
      if (flag) {
        const id = persons.find(person => person.name === newName).id

        phoneBook.update(id, {name: newName, number: newNumber})
          .then(newPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : newPerson))

            showMessage(`覆盖 ${newName} 成功！`, 'success')
          })
      }
    } else {
      PhoneBookService
        .create({name: newName, number: newNumber})
        .then(newPerson => {
          setPersons(persons.concat(newPerson))

          showMessage(`添加 ${newName} 成功！`, 'success')
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id, name) => {
    const flag = window.confirm(`确定删除 ${name} ?`)

    if (flag) {
      phoneBook
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))

          showMessage(`删除 ${name} 成功！`, 'success')
        })
    }
  }

  return (
    <div>
      <Notification message={message} type={type} />
      <h2>电话簿</h2>
      <Search text={search} handleChange={handleChangeSearch} />
      <PersonForm newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} HandleChangeNumber={HandleChangeNumber} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  )
}

export default App
