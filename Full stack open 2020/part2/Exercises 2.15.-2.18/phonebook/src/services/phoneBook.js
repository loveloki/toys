import Axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = Axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = newObject => {
  const request = Axios.post(baseUrl, newObject)

  return request.then(response => response.data)
}

export default { getAll, create }
