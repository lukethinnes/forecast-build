import { useEffect, useState } from "react";
import { WeatherDay } from '../Components/WeatherDay'
import styles from '../styles/styles.module.css'

export const App = () => {

	const locationKey = '80216'
	const apiKey = 'KAUVd5lLRzoqgG66yOkm6nWzDGoJcupV'

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
    <div className={styles.main}>
      {!!weatherInfo && weatherInfo.map((i, index) => (
        <div 
        className={styles.day}
        key={index}
        >
          <WeatherDay 
            min={i.min} 
            max={i.max}   
            weatherType={i.weatherType} 
            weatherKey={i.weatherKey}
          />
        </div>
      ))}
    </div>
  );
}

