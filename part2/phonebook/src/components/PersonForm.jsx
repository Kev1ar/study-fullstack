const PersonForm = ({handleAddPhoneBook, newName, handleNameChange, newPhoneNumber, handleNumberChange}) => {
    return (
        <form onSubmit={handleAddPhoneBook}>
            <div>
            name: <input 
                    value={newName}
                    onChange={handleNameChange}/>
            </div>
            <div>
            phone number: <input 
                    value={newPhoneNumber}
                    onChange={handleNumberChange}/>
            </div>
            <div>
            <button type="submit"
                    >add</button>
            </div>
      </form>
    )
}

export default PersonForm