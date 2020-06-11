import React from 'react'

const Notification = props => {
  const { message, type } = props

  if (message === '') {
    return null
  }

  return (
    <div className={type}>
      <h2>{message}</h2>
    </div>
  )
}

export default Notification
