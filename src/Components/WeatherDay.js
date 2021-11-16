export const WeatherDay = ({ date, min, max, weatherType, weatherKey }) => {
  return (
    <>
      <img 
        alt={weatherType}
        src={`https://developer.accuweather.com/sites/default/files/${weatherKey}-s.png`}  
      />
      <div>
        Min: {min} Max: {max}
      </div>
      <div>
       {date} 
      </div>
  </>
  );
};
