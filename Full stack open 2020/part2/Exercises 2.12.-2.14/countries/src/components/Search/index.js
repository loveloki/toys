import React from 'react'

const Search = props => {
  const { text, handleSearchChange } = props

return (
    <div>
      查找国家：
      <input type="text" value={text} onChange={handleSearchChange} />
    </div>
  )
}

export default Search
