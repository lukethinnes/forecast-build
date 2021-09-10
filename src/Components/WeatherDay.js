export const WeatherDay = ({ min, max, weatherType, weatherKey }) => {
  return (
    <div>
      <img 
        alt={weatherType}
        src={`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`}  
      />
      <div>
        Temp: {min} / {max}
      </div>
    </div>
  );
};
