import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import WeatherDisplay from "./WeatherDisplay";
import FavoritesList from "./Favoriteslist";

const key = "f1d7f251af929b4988d53707ebead6f4";

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Update favorites in localStorage
  }, [favorites]);

  useEffect(() => {
    if (!city || city.length < 3) {
      setData(null); // Clear data if city is empty or too short
      return;
    }

    const controller = new AbortController(); // Create AbortController
    const { signal } = controller;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`,
          { signal } // Pass signal to fetch
        );

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(error.message);
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      controller.abort(); // Clean up: abort fetch on component unmount or city change
    };
  }, [city]);

  function handleFavoriteClick(favCity) {
    if (!favorites.includes(favCity)) {
      setFavorites([...favorites, favCity]);
    }

    setCity("");
  }

  function handleRemove(favCity) {
    setFavorites(favorites.filter((city) => city !== favCity));
  }

  function clearFavorites() {
    setFavorites([]);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Weather Dashboard
      </h1>
      <SearchBar setCity={setCity} city={city} />

      {city === "" ? (
        <p className="text-red-500 font-bold mb-8">Please enter a city</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500 font-bold mb-8">{error}</p>
      ) : data ? (
        <WeatherDisplay
          city={city}
          data={data}
          handleFavoriteClick={handleFavoriteClick}
        />
      ) : null}

      <FavoritesList favorites={favorites} handleRemove={handleRemove} clearFavorites={clearFavorites} />
    </div>
  );
};

export default App;
