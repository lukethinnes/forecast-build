export const WeatherDay = ({ date, dayOfWeek, min, max, weatherType, weatherKey }) => {
  return (
    <>
      {dayOfWeek}
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
