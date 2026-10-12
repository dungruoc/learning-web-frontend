import React from "react";
import { formatDay, getWeather, getWeatherIcon } from "./weatherTools";


export default class App extends React.Component {
    state = {
      location: null,
      isLoading: false,
      weatherData: null
    };

  locationChangedHdl(e) {
    this.setState(st => ({...st, location: e.target.value}));
  }

  async keyDownListner(e) {
    if (e.code.toLowerCase() === 'enter' && this.state.location.length > 0) {
      console.log('searching', this.state.location);
      try {
        this.setState(st => ({...st, isLoading: true, weatherData: null}));

        const weatherData = await getWeather(this.state.location);
        this.setState(st => ({weatherData: weatherData}));
        console.log(weatherData);
      } catch (err) {
        console.error(err.message);
      } finally {
        this.setState(st => ({...st, location: null, isLoading: false}));
      }
    }
  }

  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <div>
          <input type="text" placeholder="Search for location..."
            value={this.state.location || ''}
            onChange={this.locationChangedHdl.bind(this)}
            onKeyDown={this.keyDownListner.bind(this)}/>
        </div>
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weatherData && (
          <WeatherCard weatherData={this.state.weatherData}/>
        )}
      </div>
    );
  }
}

class WeatherCard extends React.Component {

  render() {
    console.log(this.props);
    const locationDisplay = `${this.props.weatherData.locationName} ${this.props.weatherData.flag}`;
    const {
      temperature_2m_min: minTemps,
      temperature_2m_max: maxTemps,
      time: dates,
      weathercode: weathercodes
    } = this.props.weatherData.weatherData.daily;

    return (
      <div>
        <h2>Weather {locationDisplay}</h2>
        <ul className="weather">
          {dates.map((d, idx) => <DailyCard key={d}
            isToday={idx === 0}
            date={d}
            minT={minTemps.at(idx)}
            maxT={maxTemps.at(idx)}
            code={weathercodes.at(idx)}
          />)}
        </ul>
      </div>
    );
  }
}

class DailyCard extends React.Component {

  render() {
    const {
      isToday,
      date,
      minT,
      maxT,
      code
    } = this.props;

    return (
      <li className="day">
        <span>{getWeatherIcon(code)}</span>
        <p>{isToday ? 'Today' : formatDay(date)}</p>
        <p>
          {Math.floor(minT)}&deg; &mdash; <strong>{Math.ceil(maxT)}&deg;</strong>
        </p>
      </li>
    );
  }
}