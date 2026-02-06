import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const displayList = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  ) 

   useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleAddPhoneBook = (event) => {
    event.preventDefault()
    const exists = persons.some(person => person.name === newName)
    if(exists) {
      alert(`${newName} is already in the phonebook`)
    }
    else {
        const newPerson = {
          name: newName,
          phone_number: newPhoneNumber
        }
        const updatedPersons = persons.concat(newPerson)
        setPersons(updatedPersons)
    }    
    setNewName('')
    setNewPhoneNumber('')
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        value={nameFilter} 
        onChange={handleNameFilterChange}
      />
      <h2>Add New Person</h2>
      <PersonForm 
        handleAddPhoneBook={handleAddPhoneBook} 
        newName = {newName}
        handleNameChange = {handleNameChange}
        newPhoneNumber = {newPhoneNumber}
        handleNumberChange = {handleNumberChange}
      />

      <h2>Numbers</h2>
    <PersonsList
      displayList={displayList}
    />

    </div>
  )
}

export default App