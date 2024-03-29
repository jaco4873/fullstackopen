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

export default PersonForm