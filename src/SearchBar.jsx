import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "./SearchBar.css";
import { fetchNewObj } from "./features/getterSlice";
import { fetchCities } from "./fetchCities.jsx";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function SearchBar() {
  const dispatch = useDispatch();

  // update this state upon typing something in the searchbar
  const [inputValue, setInputValue] = useState("");
  // provide autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]);

  // update input value on typing + provide suggestions
  // when the string is longer than 3 characters
  const updateInput = async (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length >= 3) {
      const cities = await fetchCities(e.target.value);
      setSuggestions(cities);
    } else {
      setSuggestions([]);
    }
  };

  // when we click the "Search" button, we fire up the getDaily
  // that makes the API call and converts the response to json
  // then we use the converted object containing all weather info
  // and store it in redux
  const searchClick = async () => {
    try {
      const theForecast = await getDaily();
      await dispatch(fetchNewObj(theForecast));
      setSuggestions([]);
      setInputValue("");
    } catch {
      alert("Wrong city name");
      return;
    }
  };

  // same as above but on hitting enter while the input is focused
  const handleKey = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const theForecast = await getDaily();
      await dispatch(fetchNewObj(theForecast));
      setSuggestions([]);
      setInputValue("");
    }
  };

  // when you click on a suggestion it sets the input value to the
  // text content of the suggestion and clears the suggestions
  const handleSuggestionClick = (e) => {
    setInputValue(e.target.textContent);
    setSuggestions([]);
    inputRef.current.focus();
  };

  const coordinatesUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
  const theApi = "&cnt=10&appid=a17b38cf3321f72ce76dd08aa4f001f1&units=metric";
  const dailyUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=";

  // construct the API URL and make the call, convert it to JSON to
  // get lattitude and longtitude depending on the city from the input
  // then using lat and lon for an API call for full weather info
  const getDaily = async () => {
    const cityData = await fetch(coordinatesUrl + inputValue + theApi);
    const dataJson = await cityData.json();
    const weatherRequest = await fetch(
      dailyUrl + dataJson[0].lat + "&lon=" + dataJson[0].lon + theApi
    );
    const weatherJson = await weatherRequest.json();
    return weatherJson;
  };

  // used to put focus back on the input after clicking
  // on one of the suggestions
  const inputRef = useRef(null);

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">What&apos;s the weather?</a>
          <form className="d-flex" role="search">
            <input
              ref={inputRef}
              className="form-control me-2"
              type="text"
              placeholder="Find a location"
              aria-label="Search"
              onChange={updateInput}
              onKeyDown={handleKey}
              value={inputValue}
            />
            {
              <ButtonGroup vertical className="dropdown">
                {suggestions.map((city, index) => (
                  <Button key={index} onClick={handleSuggestionClick}>
                    {city}
                  </Button>
                ))}
              </ButtonGroup>
            }

            <button
              className="btn btn-outline-success"
              type="button"
              onClick={searchClick}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}

export default SearchBar;
