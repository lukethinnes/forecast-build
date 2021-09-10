import { useEffect, useState } from "react";
import { WeatherDay } from '../Components/WeatherDay'
export const App = () => {

	const locationKey = '80216'
	const apiKey = 'KAUVd5lLRzoqgG66yOkm6nWzDGoJcupV'

  const [weatherInfo, setWeatherInfo] = useState();

	useEffect(() => {
		fetch(
			`http://dataservice.accuweather.com/forecasts/v1/daily/5day/locationKey=${locationKey}_PC?apikey=${apiKey}`
		)
		.then(res => res.json())
		.then(res => console.log(res))
	}, [])
	return (<>Working!</>);
}

