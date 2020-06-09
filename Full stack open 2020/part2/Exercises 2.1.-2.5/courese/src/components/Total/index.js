import React from 'react'

const Total = ({ course }) => {
  const reducer = (prev, current) => prev + current
  const sum = course.parts.map(part => part.exercises).reduce(reducer, 0)

  return(
    <p>Number of exercises {sum}</p>
  )
}

export default Total
