const FilteredCountries = ({ filteredCountries, setSearchTerm }) => {
    return (
        <div>
            {filteredCountries.map(country => (
                <div key={country.name.common} className='country-item'>
                    <div>{country.name.common}</div>
                    <button onClick={() => setSearchTerm(country.name.common)}>Show</button>
                </div>
            ))}
        </div>
    );
};
export default FilteredCountries