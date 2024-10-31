import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const FavoritesList = ({ favorites, handleRemove, clearFavorites }) => {
  const [id, setId] = useState("");
  const [data, setData] = useState(null); // Start with null
  const key = "f1d7f251af929b4988d53707ebead6f4";
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}&units=imperial`
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();
  
        setData(data); // Set data only when fetched successfully
      } catch (error) {
        setError(error.message);
        setData(null); // Reset data on error
      }
    }

    fetchData();
  }, [id]);

  const handleIdChange = (clicked) => {
    if (id === clicked) {
      setId("");
      setData(null); // Reset data when the same favorite is clicked
      return;
    }

    setId(clicked);
  };

  return (
    <>
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 mb-8 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Favorite Cities</h3>
        <ul className="space-y-2">
          {favorites.map((favorite) => (
            <li
              className="flex justify-between items-center p-2 border border-gray-200 rounded-md"
              key={favorite.id}
            >
              <span className="text-gray-800 w-3/4">{favorite.name}</span>

              <button
                className="text-blue-600"
                onClick={() => handleIdChange(favorite.id)}
              >
                View
              </button>

              <button
                className="text-red-600"
                onClick={() => handleRemove(favorite)}
              >
                ❌
              </button>
            </li>
          ))}
     </ul>
     
     {
      favorites && favorites.length > 0 && <button className="text-white font-bold px-10 py-2 bg-red-600 rounded mt-4" onClick={clearFavorites}>Clear</button>
     }
      </div>

      {/* Render weather data only if it exists */}
      {data && (
        <div className="w-full max-w-md bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{`${data.name}, ${data.sys.country}`}</h2>
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
          </div>
        </div>
      )}

      {/* Optionally display error message */}
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

FavoritesList.propTypes = {
  favorites: PropTypes.array.isRequired,
 handleRemove: PropTypes.func.isRequired,
  clearFavorites: PropTypes.func.isRequired
};

export default FavoritesList;
