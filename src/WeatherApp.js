import React, { useState } from 'react';
import './App.css'

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const date = new Date().toDateString();

    const getWeather = async (cityName) => {
        setLoading(true);
        setError('');
        setWeatherData(null);

        const apiKey = '74a6fefa0dcbb7a4e32f96a38748468c';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === '404') {
                setError('City Not Found');
            } else {
                setWeatherData(data);
            }
        } catch (err) {
            setError('Error fetching weather data');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() !== '') {
            getWeather(city);
            setCity('');
        }
    };

    return (
        <div className="weather-container">
            <div className='page'>
                <h1>Weather App</h1>
                <form className="search_form" onSubmit={handleSubmit}>
                    <input
                        id="search"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                    />
                    <button className='search_btn' type="submit">Search</button>
                </form>

                <div id="weather">
                    {loading && <h2>Loading...</h2>}
                    {error && <h2>{error}</h2>}

                    {weatherData && (
                        <div className="data">
                            <h2>{weatherData.name}</h2>
                            <h3>{date}</h3>
                            <div className="clouds">
                                <img
                                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                    alt="weather icon"
                                />
                                <div>
                                    <h2>{weatherData.main.temp} ℃</h2>
                                    <h3>{weatherData.weather[0].main}</h3>
                                </div>
                            </div>

                            <div className="info">
                                <div className="col">
                                    <h4>Wind</h4>
                                    <h5>{weatherData.wind.speed} km/h</h5>
                                </div>
                                <div className="col">
                                    <h4>Humidity</h4>
                                    <h5>{weatherData.main.humidity} %</h5>
                                </div>
                                <div className="col">
                                    <h4>Air Pressure</h4>
                                    <h5>{weatherData.main.pressure} hPa</h5>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
