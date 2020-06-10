import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const handleInput = e => {
    setNewName(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const flag = persons.map(person => person.name).includes(newName)

    if (flag) {
      alert(`电话簿中已保存 ${newName}，请重新输入`)
    } else {
      setPersons(persons.concat({name: newName}))
    }

    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleInput} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { persons.map(person => <p key={person.name}>{person.name}</p>) }
    </div>
  )
}

export default App
