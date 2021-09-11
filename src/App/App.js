import { useEffect, useState } from "react";
import { WeatherDay } from '../Components/WeatherDay'
import styles from '../styles/styles.module.css'
import { apiKey } from '../constants.js'
import { LocationSearch } from '../Components/LocationSearch.js'

export const App = () => {

	const locationKey = '80216'

  const [weatherInfo, setWeatherInfo] = useState();

  const padNumber = (number) => {
    const stringNumber = number + ''
    const stringLength = stringNumber.length

    if (stringLength === 1) {
      return '0' + stringNumber
    } else {
      return stringNumber
    }
  }

	useEffect(() => {
		fetch(
			`http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}_PC?apikey=${apiKey}`
		)
		.then(res => res.json())
		.then(res => {
      setWeatherInfo(res.DailyForecasts.map(df => {
          console.log(df)
        return {
          min: df.Temperature.Minimum.Value,
          max: df.Temperature.Maximum.Value,
          weatherType: df.Day.IconPhrase,
          weatherKey: padNumber(df.Day.Icon)
        }
      }))
    })
	}, [])
	return (
  <div>
  <LocationSearch />
    <div className={styles.main}>
      {!!weatherInfo && weatherInfo.map((i, index) => (
        <div 
        className={styles.day}
        key={index}>
          <WeatherDay 
            min={i.min} 
            max={i.max}   
            weatherType={i.weatherType} 
            weatherKey={i.weatherKey}
          />
        </div>
      ))}
    </div>
  </div>
  );
}

