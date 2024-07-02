import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.inputProps.value,
      author: author.inputProps.value,
      info: info.inputProps.value,
      votes: 0,
    })
    navigate('/')
    props.setNotification(`a new anecdote "${content.value}" created!`)
    setTimeout(() => {
      props.setNotification('')
    }, 5000)
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...content.inputProps} /> 
        </div>
        <div>
          Author
          <input {...author.inputProps} /> 
        </div>
        <div>
          URL for more info
          <input {...info.inputProps} /> 
        </div>
        <button>Create</button>
      </form>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default CreateNew
