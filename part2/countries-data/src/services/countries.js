import axios from 'axios'

const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const nameUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
  const request = axios.get(allUrl)
  return request.then(response => response.data)
}

const getByName = name => {
  const request = axios.get(nameUrl+name)
  return request.then(response => response.data)
}

export default { getAll, getByName}