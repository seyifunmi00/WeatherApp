import PropTypes from "prop-types";

const SearchBar = ({ setCity, city }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <form className="w-full max-w-md flex items-center mb-6" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        className="w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-600"
        onChange={handleChange}
        value={city}
      />
      <button className="p-3 bg-blue-600 text-white font-semibold rounded-r-md">
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  setCity: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};

export default SearchBar;
