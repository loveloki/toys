import React from 'react'

const PersonForm = props => {
  const { newName, handleChangeName, newNumber, HandleChangeNumber, handleSubmit } = props

  return (
    <form>
        <h2>添加新用户</h2>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={HandleChangeNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
  )
}

export default PersonForm
