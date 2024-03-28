import { useEffect, useState } from 'react';

const SingleCountryView = ({ country }) => {

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const getWeatherData = async () => {
            const apiKey = import.meta.env.VITE_API_KEY
            const lat = country.latlng[0]
            const lon = country.latlng[1]
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
            const response = await fetch(url)
            const data = await response.json()
            console.log('Weather Data: ', data)
            setWeather(data)
        }

        getWeatherData()
    }, [country]) // re-fetch weather data when the country changes


    return (
        <div>
            <h1>{country.name.official}</h1>
            <h3>Common name: {country.name.common}</h3>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <p>Population: {country.population}</p>
            <div>
                Languages: 
                {country.languages ? (
                    <ul>
                        {Object.entries(country.languages).map(([key, value]) => (
                            <li key={key}>{value}</li>
                        ))}
                    </ul>
                ) : 'N/A'}
            </div>
            <h2>Flag</h2>
            <img src={country.flags.svg} width="200" style={{ border: '1px solid grey' }}/>
            <h2>Current Weather in {country.capital}</h2>
            {weather ? (
                <>
                    <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                    <p>Wind: {weather.wind.speed} m/s</p>
                </>
            ) : (
                <p>Loading temperature...</p>
            )}
        </div>
    )
}

export default SingleCountryView    