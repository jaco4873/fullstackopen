import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/filter'
import PersonForm from './components/personform'
import Persons from './components/persons'
import ErrorNotification from './components/errornotification'
import SuccessNotification from './components/successnotification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
            setSuccessMessage(`Updated phone number of ${newName} to ${newNumber}`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(() => {
            setErrorMessage(`Phone number of ${newName} could not be updated. Server error.`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        setNewName('')
        setNewNumber('')
        return 
      }
      // User declined overwriting, clear inputs
      setNewName('')
      setNewNumber('')
      return 
    }

    // Only create a new person if there isn't an existing one
    personService.create(personObject)
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