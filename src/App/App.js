import {useEffect, useState} from 'react';
import {WeatherDay} from '../Components/WeatherDay';
import styles from '../styles/styles.module.css';
import {apiKey} from '../constants.js';
import {LocationSearch} from '../Components/LocationSearch.js';

export const App = () => {
  const [locationKey, setLocationKey] = useState('');

  const [weatherInfo, setWeatherInfo] = useState();

  const [location, setLocation] = useState('');

  const padNumber = number => {
    const stringNumber = number + '';
    const stringLength = stringNumber.length;

    if (stringLength === 1) {
      return '0' + stringNumber;
    } else {
      return stringNumber;
    }
  };

  useEffect(() => {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    if (locationKey) {
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}?apikey=${apiKey}`,
      )
        .then(res => res.json())
        .then(res => {
          console.log(
            daysOfWeek[new Date(res.DailyForecasts[0].Date).getDay()],
          );
          setWeatherInfo(
            res.DailyForecasts.map(df => {
              return {
                min: df.Temperature.Minimum.Value,
                max: df.Temperature.Maximum.Value,
                weatherType: df.Day.IconPhrase,
                weatherKey: padNumber(df.Day.Icon),
                dayOfWeek: daysOfWeek[new Date(df.Date).getDay()],
              };
            }),
          );
        });
    }
  }, [locationKey]);

  return (
    <>
      <div className={styles.header}>FORECASTER</div>
      <div className={styles.searchContainer}>
        <LocationSearch
          onCityFound={cityInfo => {
            setLocationKey(cityInfo.key);
            setLocation(cityInfo.name + ', ' + cityInfo.state);
          }}
        />
        <h1>{location}</h1>
        <div className={styles.main}>
          {!!weatherInfo &&
            weatherInfo.map((i, index) => (
              <div className={styles.day} key={index}>
                <WeatherDay
                  min={i.min}
                  max={i.max}
                  weatherType={i.weatherType}
                  weatherKey={i.weatherKey}
                  dayOfWeek={i.dayOfWeek}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
