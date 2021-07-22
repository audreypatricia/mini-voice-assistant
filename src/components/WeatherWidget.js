import React from 'react';

const WeatherWidget = (props) => {
  return (
    <div>
      {props.weatherObj.currTemp ? (
        <div className="weather-container">
          <div className="weather-icon-item">
            <img src={props.weatherObj.icon} alt="Weather icon" />
            <h4>{props.weatherObj.iconDesc}</h4>
          </div>
          <div className="weather-details">
            <h1>{props.weatherObj.locName}</h1>
            <h2>{props.weatherObj.currTemp}°C</h2>
            <p>Feels like: {props.weatherObj.feelsLike}°C</p>
            <p>Max/Min: {props.weatherObj.maxMin}°C</p>
            <p>Wind speed: {props.weatherObj.windSpeed}km/h</p>
          </div>
        </div>
      ) : (
        <div>Hello weekly </div>
      ) }
    </div>
  );
}

export default WeatherWidget;
