const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("result");

button.addEventListener("click", getWeather);

async function getWeather() {
  const city = input.value.trim();

  if (city === "") {
    alert("Enter city name");
    return;
  }

  result.innerHTML = "Loading...";

  try {
    // 1️⃣ Convert city → latitude & longitude
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    if (!geoRes.ok) throw new Error("invalid City");

    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("invaild City");
    }

    const { latitude, longitude, name } = geoData.results[0];

    // 2️⃣ Get weather using lat & long
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!weatherRes.ok) throw new Error("Weather not available");

    const weatherData = await weatherRes.json();

    result.innerHTML = `
      <h3>${name}</h3>
      <p>🌡 Temperature: ${weatherData.current_weather.temperature} °C</p>
      <p>💨 Wind Speed: ${weatherData.current_weather.windspeed} km/h</p>
    `;
  } catch (error) {
    result.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}
