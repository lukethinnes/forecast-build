import { useState } from 'react';
import { apiKey } from '../constants.js'
import styles from '../styles/styles.module.css'

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
    <div className={styles.main}>
      <input 
        onChange={e => setZipCode(e.target.value)}
        placeholder='Zip Code'
        value={zipCode}
      />
      <button onClick={() => getLocation(zipCode)}>Search</button>
    </div>
  )
}
