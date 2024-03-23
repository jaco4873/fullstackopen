import { useState } from 'react'

const doesNameExist = (name, persons) => {
  return persons.some(person => person.name === name)
}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          value={newName}
          onChange={onNameChange}
          placeholder="Name"
        />
      </div>
      <div>
        <input
          value={newNumber}
          onChange={onNumberChange}
          placeholder="Number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}



const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => 
        <li key={person.id}>{person.name} {person.number}</li>
      )}
    </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  
  const personsVisible = searchWord
    ? persons.filter(person => person.name.toLowerCase().includes(searchWord.toLowerCase()))
    : persons

  const addPerson = (event) => {
    event.preventDefault()
    if (doesNameExist(newName, persons)) {
      alert(`${newName} already exists in the phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchWord} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm 
        onSubmit={addPerson}
        newName={newName}
        onNameChange={handleNameChange}
        newNumber={newNumber}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsVisible} />
    </div>
  )
}

export default App