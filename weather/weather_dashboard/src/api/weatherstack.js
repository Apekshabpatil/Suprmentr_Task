const API_KEY = "8001704005da587e5d07ed2fb9e5dbdc";
const BASE_URL = "https://api.weatherstack.com";

async function handleResponse(res) {
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error.info || "Weatherstack API error");
  }
  return data;
}

export async function fetchCurrentWeather(location) {
  const url = `${BASE_URL}/current?access_key=${API_KEY}&query=${encodeURIComponent(
    location
  )}&units=m`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function fetchHistoricalWeather(location, date) {
  const url = `${BASE_URL}/historical?access_key=${API_KEY}&query=${encodeURIComponent(
    location
  )}&historical_date=${date}&units=m`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function fetchMarineWeather(lat, lon) {
  const query = `${lat},${lon}`;
  const url = `${BASE_URL}/marine?access_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}&units=m`;
  const res = await fetch(url);
  return handleResponse(res);
}

