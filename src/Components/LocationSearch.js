import { useState } from 'react';
import { apiKey } from '../constants.js'

export const LocationSearch = ({ onCityFound }) => {

  const [zipCode, setZipCode] = useState('')

  const getLocation = (zip) => {
    const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&q=${zip}`   
    fetch(url)
      .then(res => res.json())
      .then(res => res.find(i => i.Country.ID === 'US'))
      .then(res => onCityFound( {
        name: res.LocalizedName,
        key: res.Key,
        state: res.AdministrativeArea.ID,
      }))
  }

  return (
    <div>
      <input 
        onChange={e => setZipCode(e.target.value)}
        value={zipCode}
      />
      <button onClick={() => getLocation(zipCode)}>Search</button>
    </div>
  )
}
