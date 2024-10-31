import PropTypes from "prop-types";

const WeatherDisplay = ({ city, data, handleFavoriteClick }) => {
  if (!data || !data.main) return null; // Return null if data is missing or incomplete

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{`${city}, ${data.sys.country}`}</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-6xl font-bold text-gray-800">{data.main.temp}°F</p>
          <p className="text-gray-600">{data.weather[0].description}</p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          className="w-20 h-20"
        />
      </div>
      <div className="mt-4">
        <p className="text-gray-700">Humidity: {data.main.humidity}%</p>
     <p className="text-gray-700">Wind: {data.wind.speed} mph</p>
     <button className="text-white text-center font-bold px-6 py-2 bg-blue-600 rounded mt-4" onClick={()=>handleFavoriteClick(data)}>Add to Favorites</button>
      </div>
    </div>
  );
};

WeatherDisplay.propTypes = {
  city: PropTypes.string.isRequired,
 data: PropTypes.object,
  handleFavoriteClick: PropTypes.func.isRequired
};

export default WeatherDisplay;
