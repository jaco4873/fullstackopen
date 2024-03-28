import axios from 'axios'
import { useEffect, useState } from 'react'
import CountryOverview from './components/CountryOverview'

const Search = ({ value, onChange }) => {
  return (
    <div>
      Find countries: <input value={value} onChange={onChange} />
    </div>
  )
}

    
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [])  

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <Search value={searchTerm} onChange={handleSearchTermChange} />
      <CountryOverview countries={countries} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
  )
}

export default App