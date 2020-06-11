import React from 'react'

const Note = props => {
  const { name, number } = props

  return (
    <p>{name} {number}</p>
  )
}

export default Note
