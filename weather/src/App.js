import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("Kolkata");

  const getWeather = async () => {
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=d6708da515378915c3aa73698d1a8ed2`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      setWeather(data);
    } catch (error) {
      console.log(error);
      alert("Error: API is not working properly.");
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const checkWeather = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <>
      <div className="app">
        <div className="task-container">
          <form className="task-form" onSubmit={checkWeather}>
            <input
              type="text"
              placeholder="Search for city"
              name="name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Check</button>
          </form>

          {weather?.cod !== "404" ? (
            <div className="data">
              <div className="data_sub">
                <h3> {weather?.name}</h3>
                <p>
                  Temp: <span> {weather?.main?.temp}</span>
                </p>
                <p>
                  Min Temp: <span> {weather?.main?.temp_min}</span> &nbsp;
                  &nbsp; Max Temp: <span> {weather?.main?.temp_max}</span>
                </p>
                <p>
                  Wind Speed: <span>{weather?.wind?.speed}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="data">
              <p>The place is not found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
