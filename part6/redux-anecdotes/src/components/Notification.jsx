import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      <br></br>
      <div style={style}>
        {notification}
      </div>
      <br></br>
    </>)
}

export default Notification