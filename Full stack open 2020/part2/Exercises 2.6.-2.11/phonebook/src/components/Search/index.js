import React from 'react'

const Search = props => {
  const { text, handleChange } = props

  return (
    <div>
      查找用户：<input type="text" value={text} onChange={handleChange} />
    </div>
  )
}

export default Search
