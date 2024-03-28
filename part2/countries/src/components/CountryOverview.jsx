import SingleCountryView from './SingleCountryView'
import FilteredCountries from './FilteredCountries'

const CountryOverview = ({ countries, searchTerm, setSearchTerm }) => {
  
    const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    
      console.log('Filtered countries: ', filteredCountries.length)
  
    if (searchTerm === '') {
      return <p>Please enter a search term to find information about a country of interest.</p>
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length > 1) { 
      console.log('Filtered countries: ', filteredCountries);
      return <FilteredCountries filteredCountries={filteredCountries} setSearchTerm={setSearchTerm} />
    } else if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      console.log('Country: ', country)
      return <SingleCountryView country={country} />
    } else {
      return <p>No matching countries found.</p>
    }
  }

  export default CountryOverview