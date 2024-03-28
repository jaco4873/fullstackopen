import { useEffect, useState } from 'react'
import personService from './services/persons'


/* Components */

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



const Persons = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map(person => 
        <li key={person.id}> 
          {person.name} {person.number}
          <button type="button" onClick={() => onDelete(person.id)}>delete</button>  
        </li>
      )}
    </ul>
  )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

/* App Component */

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  /* Render all persons on first render */
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
    
  /* Add new person and write to db, then concat to currents list of persons (done client side, but will persist in the database if refreshed) */
  
  const findExistingPerson = (personObject, persons) => {
    return persons.find(person => person.name === personObject.name) || null
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    const alreadyExisting = findExistingPerson(personObject, persons)
     
    if (alreadyExisting) {
      const userResponse = window.confirm(`${newName} already exists in the phonebook, do you want to overwrite the number with: ${newNumber}`)
      console.log('User response:', userResponse)
      if (userResponse) {
        personService.update(alreadyExisting.id, personObject)
            .then(updatedPerson => {
                setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
                setSuccessMessage(`Updated phonenumber of ${newName} to ${newNumber}`)
                setTimeout(() => {
                    setSuccessMessage(null)
                }, 5000)
                setNewName('')
                setNewNumber('')
            })
            .catch(() => {
                setErrorMessage(`Phone number of ${newName} could not be updated. Server error.`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    } else {
        setNewName('')
        setNewNumber('')
        console.log('User declined overwriting')
    }
    return
}

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Created entry for ${newName} with number ${newNumber}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      })
  }

  /* Delete person */
  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setSuccessMessage(`Person with id ${id} was removed from the server.`)
      })
      .catch(() => {
        setErrorMessage(`Person with id ${id} was already removed from the server. UI updated.`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        personService.getAll()
        .then(updatedPersons => {
          setPersons(updatedPersons)
        })
      })
  }

  /* Search functionality */
  const personsVisible = searchWord
    ? persons.filter(person => person.name.toLowerCase().includes(searchWord.toLowerCase()))
    : persons

 

  /* eventHandlers */
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
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
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
      <Persons persons={personsVisible} onDelete={deletePerson}/>
    </div>
  )
}

export default App