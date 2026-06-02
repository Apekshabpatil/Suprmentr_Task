import React, { useState } from "react";
import {
  fetchCurrentWeather,
  fetchHistoricalWeather,
  fetchMarineWeather,
} from "./api/weatherstack.js";

const TABS = {
  CURRENT: "current",
  HISTORICAL: "historical",
  MARINE: "marine",
};

function prettyDateInputDefault() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function WeatherCard({ title, data, loading, error }) {
  return (
    <div className="glass-card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {loading && <p className="muted">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && data && (
          <>
            <section className="summary-grid">
              {data.location && (
                <div>
                  <p className="label">Location</p>
                  <p>
                    {data.location.name}, {data.location.region},{" "}
                    {data.location.country}
                  </p>
                </div>
              )}
              {data.current && (
                <>
                  <div>
                    <p className="label">Temperature</p>
                    <p>{data.current.temperature} °C</p>
                  </div>
                  <div>
                    <p className="label">Condition</p>
                    <p>{data.current.weather_descriptions?.join(", ")}</p>
                  </div>
                  <div>
                    <p className="label">Feels like</p>
                    <p>{data.current.feelslike} °C</p>
                  </div>
                  <div>
                    <p className="label">Humidity</p>
                    <p>{data.current.humidity} %</p>
                  </div>
                  <div>
                    <p className="label">Wind</p>
                    <p>
                      {data.current.wind_speed} km/h {data.current.wind_dir}
                    </p>
                  </div>
                </>
              )}
            </section>
            <details className="raw-json">
              <summary>View raw response JSON</summary>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </details>
          </>
        )}
        {!loading && !error && !data && (
          <p className="muted">No data yet. Fill the form and hit Get weather.</p>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS.CURRENT);

  const [location, setLocation] = useState("London");
  const [historicalDate, setHistoricalDate] = useState(prettyDateInputDefault());
  const [marineLat, setMarineLat] = useState("51.50");
  const [marineLon, setMarineLon] = useState("-0.12");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFetch() {
    setLoading(true);
    setError("");
    setData(null);
    try {
      let result;
      if (activeTab === TABS.CURRENT) {
        result = await fetchCurrentWeather(location);
      } else if (activeTab === TABS.HISTORICAL) {
        if (!historicalDate) {
          throw new Error("Please select a date.");
        }
        result = await fetchHistoricalWeather(location, historicalDate);
      } else if (activeTab === TABS.MARINE) {
        if (!marineLat || !marineLon) {
          throw new Error("Please enter latitude and longitude.");
        }
        result = await fetchMarineWeather(marineLat, marineLon);
      }
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const headingMap = {
    [TABS.CURRENT]: "Current weather",
    [TABS.HISTORICAL]: "Historical weather",
    [TABS.MARINE]: "Marine weather",
  };

  return (
    <div className="app-root">
      <div className="bg-gradient" />
      <main className="content">
        <header className="app-header glass-card">
          <div>
            <h1>Weather Glass</h1>
            <p className="muted">
              Powered by Weatherstack – view current, historical, and marine
              weather with a glassmorphic UI.
            </p>
          </div>
          <div className="badge">Weatherstack API</div>
        </header>

        <section className="glass-card controls-card">
          <div className="tabs">
            <button
              className={activeTab === TABS.CURRENT ? "tab active" : "tab"}
              onClick={() => setActiveTab(TABS.CURRENT)}
            >
              Current
            </button>
            <button
              className={activeTab === TABS.HISTORICAL ? "tab active" : "tab"}
              onClick={() => setActiveTab(TABS.HISTORICAL)}
            >
              Historical
            </button>
            <button
              className={activeTab === TABS.MARINE ? "tab active" : "tab"}
              onClick={() => setActiveTab(TABS.MARINE)}
            >
              Marine
            </button>
          </div>

          <div className="controls-grid">
            {(activeTab === TABS.CURRENT || activeTab === TABS.HISTORICAL) && (
              <div className="form-field">
                <label>Location (city, region or ZIP)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. London, New York, 94016"
                />
              </div>
            )}

            {activeTab === TABS.HISTORICAL && (
              <div className="form-field">
                <label>Historical date</label>
                <input
                  type="date"
                  value={historicalDate}
                  onChange={(e) => setHistoricalDate(e.target.value)}
                  max={prettyDateInputDefault()}
                />
              </div>
            )}

            {activeTab === TABS.MARINE && (
              <>
                <div className="form-field">
                  <label>Latitude</label>
                  <input
                    type="number"
                    step="0.01"
                    value={marineLat}
                    onChange={(e) => setMarineLat(e.target.value)}
                    placeholder="e.g. 51.50"
                  />
                </div>
                <div className="form-field">
                  <label>Longitude</label>
                  <input
                    type="number"
                    step="0.01"
                    value={marineLon}
                    onChange={(e) => setMarineLon(e.target.value)}
                    placeholder="e.g. -0.12"
                  />
                </div>
              </>
            )}

            <div className="form-actions">
              <button className="primary-btn" onClick={handleFetch} disabled={loading}>
                {loading ? "Fetching..." : "Get weather"}
              </button>
            </div>
          </div>
        </section>

        <WeatherCard
          title={headingMap[activeTab]}
          data={data}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}
