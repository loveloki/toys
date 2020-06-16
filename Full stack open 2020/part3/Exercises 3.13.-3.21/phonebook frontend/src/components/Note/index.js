import React from 'react'

const Note = props => {
  const { name, number, deletePerson } = props

  return (
    <p>
      {name} {number}
      <button onClick={deletePerson}>delete</button>
    </p>
  )
}

export default Note
