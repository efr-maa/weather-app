// SkyCast — live weather lookup powered by WeatherAPI
// Get your own free key at https://www.weatherapi.com/

const API_KEY = "05a6d0aa7b40470d83b202659262704"; // consider replacing with your own key

const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".location");
const dateandTimeField = document.querySelector(".date_time");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");
const weatherIcon = document.querySelector("#weatherIcon");
const container = document.querySelector("#weatherContainer");

form.addEventListener("submit", searchForLocation);

let target = "Raleigh";

const fetchResults = async (targetLocation) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(targetLocation)}&aqi=no`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      alert("Location not found. Please try again.");
      return;
    }

    const locationName = data.location.name;
    const time = data.location.localtime;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;

    updateDetails(temp, locationName, time, condition);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Something went wrong. Please try again.");
  }
};

function updateDetails(temp, locationName, time, condition) {
  const [datePart, timePart] = time.split(" ");
  const [year, month, day] = datePart.split("-");

  const dateObj = new Date(year, month - 1, day);
  const currentDay = getDayName(dateObj.getDay());

  temperatureField.innerText = `${Math.round(temp)}°C`;
  locationField.innerText = locationName;
  dateandTimeField.innerText = `${timePart} - ${currentDay} ${datePart}`;
  conditionField.innerText = condition;

  applyWeatherTheme(condition);
}

function applyWeatherTheme(condition) {
  const text = condition.toLowerCase();

  container.className = "container";

  if (text.includes("thunder")) {
    container.classList.add("theme-storm");
    weatherIcon.textContent = "⛈️";
  } else if (text.includes("snow") || text.includes("blizzard") || text.includes("ice")) {
    container.classList.add("theme-snow");
    weatherIcon.textContent = "❄️";
  } else if (text.includes("rain") || text.includes("drizzle")) {
    container.classList.add("theme-rain");
    weatherIcon.textContent = "🌧️";
  } else if (text.includes("mist") || text.includes("fog") || text.includes("haze")) {
    container.classList.add("theme-mist");
    weatherIcon.textContent = "🌫️";
  } else if (text.includes("cloud") || text.includes("overcast")) {
    container.classList.add("theme-clouds");
    weatherIcon.textContent = "⛅";
  } else if (text.includes("clear") || text.includes("sunny")) {
    container.classList.add("theme-clear");
    weatherIcon.textContent = "☀️";
  } else {
    container.classList.add("theme-default");
    weatherIcon.textContent = "🌡️";
  }
}

function searchForLocation(e) {
  e.preventDefault();
  target = searchField.value.trim();
  if (!target) return;
  fetchResults(target);
  searchField.value = "";
}

function getDayName(number) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[number];
}

fetchResults(target);