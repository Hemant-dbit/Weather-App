document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cityInput").addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
          getWeather();
      }
  });
});

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  
  if (!city) {
      alert("⚠️ Please enter a city name.");
      return;
  }

  const apiKey = "af391c52bd6b4635979180518252503";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error("City not found");
          }
          return response.json();
      })
      .then(data => {
          document.getElementById("location").innerText = `📍 ${data.location.name}, ${data.location.country}`;
          document.getElementById("weather").innerText = `🌡️ ${data.current.temp_c}°C, ${data.current.condition.text}`;
          // document.getElementById("weatherIcon").src = data.current.condition.icon;
          // document.getElementById("weatherIcon").style.display = "block";
      })
      .catch(() => {
          document.getElementById("location").innerText = "";
          document.getElementById("weather").innerText = "⚠️ City not found! Please try again.";
          document.getElementById("weatherIcon").style.display = "none";
      });
}
