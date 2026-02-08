import { useState, useEffect} from 'react'

import Filter from './components/Filter'
import Notification from './components/Notification'
import Country from './components/Country'
import CountryInList from './components/CountryInList'

import countryService from './services/countries'
function App() {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])


  const filteredCountries = countries.filter(country => (
    country.name.common.toLowerCase().includes(countryFilter.toLocaleLowerCase()) 
  ))

  const notificationMessage = (filteredCountries.length > 10)
    ? 'Too many matches, specify another filter'
    : null


  useEffect(() => {
    countryService
      .getAll()
      .then(updatedCountries => {
        setCountries(updatedCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <div>
      <Filter
        value ={countryFilter}
        onChange={handleFilterChange}/>
      <Notification
        message={notificationMessage}/>

        { filteredCountries.length > 1 &&
          filteredCountries.length <= 10 && 
          (
            <ul>
              {filteredCountries.map(country => (
                <CountryInList
                  key={country.name.common}
                  country={country}
                  />
              ))}
            </ul>
          )
        }

        { filteredCountries.length === 1 && (
        <Country country={filteredCountries[0]} />
        )}

    </div>
  )
}

export default App
