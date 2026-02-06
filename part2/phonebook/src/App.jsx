import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsList from './components/PersonsList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone_number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone_number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone_number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone_number: '39-23-6423122', id: 4 }
  ])

  const [displayList, setDisplayList] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

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
      const results = updatedPersons.filter(person =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
      setDisplayList(results)
        
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
    const searchName = event.target.value
    setNameFilter(event.target.value)
    const results = persons.filter(person =>
      person.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setDisplayList(results)
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