import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'

import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const displayList = persons.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase())
  ) 

   useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(updatedPersons => {
        setPersons(updatedPersons)
      })
  }, [])

  const handleAddPhoneBook = (event) => {
    event.preventDefault()

    const newPerson = {
          name: newName,
          number: newPhoneNumber
        }

    const existingPerson = persons.find(person => person.name === newName)

    if(existingPerson) {
      if(window.confirm(`${newName} is already in the phonebook, do you want to replace the number?`)){
        personService
          .update( existingPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons( 
              persons.map(person =>
              person.id === returnedPerson.id
                ? returnedPerson
                : person
              ))
            setNewName('')
            setNewPhoneNumber('')
          })
      }
    }
    
    else {
        personService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewPhoneNumber('')
            setNotificationMessage(`Added '${newPerson.name}'` )
          })
    }    
    
  }

  const handleDelete = (event) => {
    const object = persons.find( person => person.id === event.target.id)
    if (window.confirm("Do you want to delete " + object.name )){
      personService.deletePerson(event.target.id)
      const updatedItems = persons.filter(item => item.id !== event.target.id)
      setPersons(updatedItems)
    }
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
      <Notification message={notificationMessage} />
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
      onClick={handleDelete}
    />

    </div>
  )
}

export default App