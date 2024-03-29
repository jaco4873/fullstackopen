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

export default Persons