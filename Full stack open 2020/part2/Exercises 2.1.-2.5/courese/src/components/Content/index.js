import React from 'react'
import Part from '../Part'

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(({ id, name, exercises }) => <Part key={id} name={name} exercises={exercises} />)}
    </div>
  )
}

export default Content
